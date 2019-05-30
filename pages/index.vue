<template>
  <div>
    <super-canvas>
      <logo
        ref="logo"
        :color="logoColor"
        :x="logoPosition[0]"
        :y="logoPosition[1]"
      />

      <template v-if="debug">
        <debug
          :animating="animating"
          @start="startAnimating"
          @stop="stopAnimating"
        />
        <template v-if="walls.length">
          <super-line
            v-for="(wall, index) in walls"
            :key="index"
            :p1="wall[0]"
            :p2="wall[1]"
          />
        </template>

        <super-line
          :p1="course[0]"
          :p2="course[1]"
        />

        <location-marker
          v-if="collision"
          :x="collision[0]"
          :y="collision[1]"
        />
      </template>
    </super-canvas>

    <credits :class="$style.credits" />
  </div>
</template>

<script>
import Debug from '~/components/Debug';
import Credits from '~/components/Credits';
import LocationMarker from '~/components/LocationMarker';
import Logo from '~/components/Logo';
import SuperCanvas from '~/components/SuperCanvas';
import SuperLine from '~/components/SuperLine';
import dimensionsMixin from '~/mixins/dimensionsMixin';
import entityManagerMixin from '~/mixins/entityManagerMixin';
import {
  abs,
  add,
  difference,
  multiply,
  intersect,
  smallerThan,
} from '~/lib/vector-math';
import createAnimationObserver from '~/lib/create-animation-observer';

const VELOCITY = 100; // pixels per second

const transformations = [
  [1, -1], // top
  [-1, 1], // left
  [1, -1], // bottom
  [-1, 1], // right
];

export default {
  components: {
    Debug,
    Credits,
    LocationMarker,
    Logo,
    SuperCanvas,
    SuperLine,
  },
  mixins: [dimensionsMixin, entityManagerMixin],
  data() {
    return {
      debug: false,
      animating: false,
      logoPosition: [0, 0],
      velocityVector: [VELOCITY, VELOCITY],
      collision: null,
      requiredTransformations: [],
    };
  },
  computed: {
    course() {
      return [
        this.logoPosition,
        add(this.logoPosition, multiply(this.velocityVector, [1000, 1000])),
      ];
    },

    ready() {
      return this.dimensionsKnown
             && this.entities.length > 0
             && this.entities.every(entity => entity.dimensionsKnown);
    },

    walls() {
      if (!this.ready) {
        return [];
      }

      const { logo } = this.$refs;
      const width = this.width - logo.width;
      const height = this.height - logo.height;

      return [
        [[0, 0], [width, 0]], // top
        [[0, 0], [0, height]], // left
        [[0, height], [width, height]], // bottom
        [[width, 0], [width, height]], // right
      ];
    },

    logoColor() {
      return this.$store.state.color;
    },
  },
  watch: {
    ready(ready) {
      if (!ready) {
        return;
      }
      this.calculateCollisions();
      this.startAnimating();
    },
  },
  created() {
    this.animationObserver = createAnimationObserver();
  },
  mounted() {
    this.resizeEventListener = () => {
      this.calculateCollisions();
    };

    window.addEventListener('resize', this.resizeEventListener);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeEventListener);
  },
  methods: {
    startAnimating() {
      this.animating = true;
      this.animationSubscription = this.animationObserver.subscribe((interval) => {
        this.tick(interval);
      });
    },

    stopAnimating() {
      this.animationSubscription.unsubscribe();
      this.animating = false;
    },

    toggleAnimation() {
      const action = this.animating ? 'stop' : 'start';
      this[`${action}Animating`]();
    },

    tick(interval) {
      // Bail out if we are not ready yet (might happen when hot-reloading this component)
      if (!this.ready) {
        return;
      }

      // Check if we are out of bounds and fix it
      const [logoX, logoY] = this.logoPosition;
      if (logoX < 0 || logoX > this.width - this.$refs.logo.width) {
        this.logoPosition = [this.width - this.$refs.logo.width, logoY];
        this.calculateCollisions();
      }

      if (logoY < 0 || logoY > this.height - this.$refs.logo.height) {
        this.logoPosition = [logoX, this.height - this.$refs.logo.height];
        this.calculateCollisions();
      }

      // Calculate the needed translation
      const [velocityX, velocityY] = this.velocityVector;
      const translation = [
        interval * (velocityX / 1000),
        interval * (velocityY / 1000),
      ];

      // Check if we will collide when applying the translation
      const willCollide = this.collision
        && smallerThan(difference(this.logoPosition, this.collision), abs(translation));

      if (willCollide) {
        this.logoPosition.splice(0, 2, ...this.collision);
        this.velocityVector = this.requiredTransformations.reduce(
          (velocity, transformation) => multiply(velocity, transformation),
          this.velocityVector,
        );
        this.$store.commit('updateColor');
        this.calculateCollisions();
      } else {
        const newLogoPosition = add(this.logoPosition, translation);
        this.logoPosition.splice(0, 2, ...newLogoPosition);
      }
    },

    calculateCollisions() {
      if (this.walls.length === 0) {
        return;
      }

      const collisions = this.walls
        // Calculate the intersection with each wall
        .map(wall => ([wall, intersect(wall, this.course)]))
        // Filter out walls that do not intersect
        .filter(([, intersection]) => intersection !== false);

      // Find collisions that are not at the current position
      const collisionsNotAtCurrentPosition = collisions.filter(([, intersection]) => {
        const distance = difference(this.logoPosition, intersection)
          .reduce((sum, diff) => sum + diff, 0);

        return distance >= 1;
      });

      // If all detected collisions are at the current position, then we just haven't
      // handled the collision yet, so keep them as valid.
      const validCollisions = collisionsNotAtCurrentPosition.length > 0
        ? collisionsNotAtCurrentPosition
        : collisions;

      // This shouldn't happen, but lets try not to crash
      if (validCollisions.length === 0) {
        this.collision = null;
        this.requiredTransformations = [];
        return;
      }

      // Make the intersection where we're gonna collide available in local state
      const [, collision] = validCollisions[0];
      this.collision = collision;

      // Figure out which transformations to apply to the velocity vector when we collide
      this.requiredTransformations = validCollisions.map(([wall]) => {
        const index = this.walls.indexOf(wall);
        return transformations[index];
      });
    },
  },
};
</script>

<style lang="scss" module>
.credits {
  position: absolute;
  right: 10px;
  bottom: 10px;
}
</style>
