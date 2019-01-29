<template>
  <div :class="$style.canvas">
    <logo
      :color="logoColor"
      :x="logoPosition[0]"
      :y="logoPosition[1]"
      @click.native="toggleAnimation"
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

export default {
  components: { Logo },
  mixins: [dimensionsMixin, entityManagerMixin],
  data() {
    return {
      animating: false,
      logoPosition: [10, 10],
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

      this.setInitialLogoPosition();
    },

    logoCollisions: {
      immediate: true,
      handler(collisions) {
        if (collisions.length === 0) {
          return;
        }

        const transforms = {
          [COLLISION_TOP]: [1, -1],
          [COLLISION_BOTTOM]: [1, -1],
          [COLLISION_LEFT]: [-1, 1],
          [COLLISION_RIGHT]: [-1, 1],
        };

        const newVelocityVector = collisions.reduce(
          (vector, collision) => multiply(vector, transforms[collision]),
          this.velocityVector,
        );

        this.velocityVector.splice(0, 2, ...newVelocityVector);
        this.$store.commit('updateColor');
      },
    },
  },
  created() {
    this.animationObserver = createAnimationObserver();
  },
  methods: {
    setInitialLogoPosition() {
      const [logo] = this.entities;
      this.logoPosition.splice(
        0,
        2,
        this.width / 2 - logo.width / 2,
        this.height / 2 - logo.height / 2,
      );
    },

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
      this.logoPosition = add(this.logoPosition, translation);
    },
  },
};
</script>

<style module>
.canvas {
  width: 100vw;
  height: 100vh;
}
</style>
