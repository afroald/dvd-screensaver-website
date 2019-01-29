export default {
  data() {
    return {
      width: 0,
      height: 0,
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.updateDimensions();
    });

    this.resizeEventListener = () => {
      this.updateDimensions();
    };

    window.addEventListener('resize', this.resizeEventListener);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.resizeEventListener);
  },

  methods: {
    updateDimensions() {
      this.width = this.$el.clientWidth;
      this.height = this.$el.clientHeight;
    },
  },
};
