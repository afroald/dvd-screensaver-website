export default {
  data() {
    return {
      pageVisible: null,
    };
  },
  mounted() {
    this.visibilityChangeHandler = () => {
      this.pageVisible = !document.hidden;
    };
    window.addEventListener('visibilitychange', this.visibilityChangeHandler);
  },
  beforeDestroy() {
    window.removeEventListener('visibilitychange', this.visibilityChangeHandler);
  },
};
