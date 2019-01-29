export default {
  inject: ['entityManager'],
  created() {
    this.$nextTick(() => {
      this.entityManager.addEntity(this);
    });
  },

  beforeDestroy() {
    this.entityManager.removeEntity(this);
  },
};
