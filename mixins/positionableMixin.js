export default {
  props: {
    x: {
      type: Number,
      default: 0,
    },
    y: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    positionTransform() {
      return `translateX(${this.x}px) translateY(${this.y}px) translate3d(0,0,0)`;
    },
  },
};
