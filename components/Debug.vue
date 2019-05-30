<template>
  <div :class="$style.debug">
    <button @click="$emit('start')">
      start
    </button>
    <button @click="$emit('stop')">
      stop
    </button>

    <ul>
      <li>Animating: {{ animating }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    animating: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="scss" module>
.debug {
  position: absolute;
  left: 0;
  bottom: 0;
}
</style>
