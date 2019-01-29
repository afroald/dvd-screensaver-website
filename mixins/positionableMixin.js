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
    transform() {
      return `translateX(${this.x}px) translateY(${this.y}px)`;
    },
  },
};
