<template>
  <div :class="$style.canvas">
    <logo
      :color="logoColor"
      :x="logoPosition[0]"
      :y="logoPosition[1]"
    />
  </div>
</template>

<script>
import Logo from '~/components/Logo';
import dimensionsMixin from '~/mixins/dimensionsMixin';
import entityManagerMixin from '~/mixins/entityManagerMixin';
import { add, multiply } from '~/lib/vector-math';
import createAnimationObserver from '~/lib/create-animation-observer';

const VELOCITY = 100; // pixels per second

const COLLISION_RIGHT = Symbol('COLLISION_RIGHT');
const COLLISION_TOP = Symbol('COLLISION_TOP');
const COLLISION_LEFT = Symbol('COLLISION_LEFT');
const COLLISION_BOTTOM = Symbol('COLLISION_BOTTOM');

const transforms = {
  [COLLISION_TOP]: [1, -1],
  [COLLISION_BOTTOM]: [1, -1],
  [COLLISION_LEFT]: [-1, 1],
  [COLLISION_RIGHT]: [-1, 1],
};

export default {
  components: { Logo },
  mixins: [dimensionsMixin, entityManagerMixin],
  data() {
    return {
      animating: false,
      logoPosition: [1, 1],
      velocityVector: [VELOCITY, VELOCITY],
    };
  },
  computed: {
    ready() {
      return this.dimensionsKnown
             && this.entities.length > 0
             && this.entities.every(entity => entity.dimensionsKnown);
    },

    logoCollisions() {
      if (!this.animating || this.entities.length === 0) {
        return [];
      }

      const [logo] = this.entities;
      const [x, y] = this.logoPosition;

      const collisionTop = y <= 0;
      const collisionLeft = x <= 0;
      const collisionRight = x + logo.width >= this.width;
      const collisionBottom = y + logo.height >= this.height;

      return [
        collisionTop ? COLLISION_TOP : null,
        collisionLeft ? COLLISION_LEFT : null,
        collisionRight ? COLLISION_RIGHT : null,
        collisionBottom ? COLLISION_BOTTOM : null,
      ].filter(Boolean);
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
      this.startAnimating();
    },

    logoCollisions: {
      immediate: true,
      handler(collisions) {
        if (collisions.length === 0) {
          return;
        }

        const newVelocityVector = collisions.reduce(
          (vector, collision) => multiply(vector, transforms[collision]),
          this.velocityVector,
        );

        console.log('Updated vector after collisions', newVelocityVector);

        this.velocityVector.splice(0, 2, ...newVelocityVector);
        this.$store.commit('updateColor');
      },
    },
  },
  created() {
    this.animationObserver = createAnimationObserver();
  },
  mounted() {
    this.visibilityChangeHandler = () => {
      if (document.hidden) {
        console.log('Stopping animation because page became hidden');
        this.stopAnimating();
      } else {
        console.log('Starting animation because page became visible');
        this.startAnimating();
      }
    };
    window.addEventListener('visibilitychange', this.visibilityChangeHandler);
  },
  beforeDestroy() {
    window.removeEventListener('visibilitychange', this.visibilityChangeHandler);
  },
  methods: {
    startAnimating() {
      this.animating = true;
      this.animationSubscription = this.animationObserver.subscribe((interval) => {
        this.tick(interval);
      });
    },

    stopAnimating() {
      this.animating = false;
      this.animationSubscription.unsubscribe();
    },

    toggleAnimation() {
      const action = this.animating ? 'stop' : 'start';
      this[`${action}Animating`]();
    },

    tick(interval) {
      const [x, y] = this.velocityVector;
      const translation = [
        interval * (x / 1000),
        interval * (y / 1000),
      ];

      const newLogoPosition = add(this.logoPosition, translation);

      // Yea probably smart to check bounds 🤖
      if (newLogoPosition[0] < 0) {
        newLogoPosition[0] = 0;
      }

      if (newLogoPosition[0] > this.width) {
        newLogoPosition[0] = this.width;
      }

      if (newLogoPosition[1] < 0) {
        newLogoPosition[1] = 0;
      }

      if (newLogoPosition[1] > this.height) {
        newLogoPosition[1] = this.height;
      }

      this.logoPosition.splice(0, 2, ...newLogoPosition);
    },
  },
};
</script>

<style module>
.canvas {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
