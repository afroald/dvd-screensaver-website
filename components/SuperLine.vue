<template>
  <div :class="$style.line" :style="{ width, transform }" />
</template>

<script>
import {
  angle,
  // multiply,
  isVector,
  subtract,
} from '~/lib/vector-math';

export default {
  props: {
    p1: {
      type: Array,
      required: true,
      validator: isVector,
    },
    p2: {
      type: Array,
      required: true,
      validator: isVector,
    },
  },

  computed: {
    angle() {
      const [x, y] = subtract(this.p2, this.p1);
      return angle([x, y]);
    },

    width() {
      const [a, b] = subtract(this.p2, this.p1);
      const length = Math.hypot(a, b);
      return `${length}px`;
    },

    transform() {
      const [x] = subtract(this.p2, this.p1);
      const scale = x < 0 ? 'scale(-1, -1)' : 'scale(1, 1)';
      return `translateX(${this.p1[0]}px) translateY(${this.p1[1]}px) translate3d(0,0,0) ${scale} rotate(${this.angle}deg)`;
    },
  },
};
</script>

<style lang="scss" module>
.line {
  position: absolute;
  width: 4000px;
  height: 0px;
  border-bottom: 1px dotted red;
  transform-origin: 0 0;

  &::after {
    position: absolute;
    top: -10px;
    left: 50px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 10px 0 10px 15px;
    border-color: transparent transparent transparent red;
    content: '';
  }
}
</style>
