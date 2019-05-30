<template>
  <div :class="$style.canvas">
    <slot />
  </div>
</template>

<style lang="scss" module>
.canvas {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
