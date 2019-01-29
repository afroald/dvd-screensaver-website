export default {
  data() {
    return {
      entities: [],
    };
  },

  provide() {
    return {
      entityManager: this,
    };
  },

  methods: {
    addEntity(entity) {
      this.entities.push(entity);
    },

    removeEntity(entity) {
      if (!this.entities.includes(entity)) {
        return;
      }

      const index = this.entities.indexOf(entity);
      this.entities.splice(index, 1);
    },
  },
};
