<template>
  <div :class="$style.marker" :style="{ transform }">
    ⦿
  </div>
</template>

<script>
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
      return `translateX(${this.x - 20}px) translateY(${
        this.y - 20
      }px) translate3d(0,0,0)`;
    },
  },
};
</script>

<style lang="scss" module>
.marker {
  position: absolute;
  width: 40px;
  height: 40px;
  font-size: 40px;
  line-height: 1;
  color: red;
  text-align: center;
}
</style>
