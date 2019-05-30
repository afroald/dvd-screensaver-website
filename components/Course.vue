<template>
  <div
    :class="$style.course"
    :style="{ transform }"
  />
</template>

<script>
import positionableMixin from '~/mixins/positionableMixin';

export default {
  mixins: [positionableMixin],
  props: {
    direction: {
      type: Number,
      required: true,
    },
  },

  computed: {
    transform() {
      return `${this.positionTransform} rotate(${this.direction}deg)`;
    },
  },
};
</script>

<style lang="scss" module>
.course {
  position: absolute;
  width: 4000px;
  height: 0px;
  border-bottom: 1px dotted red;
  transform-origin: 0 0;

  &::after {
    position: absolute;
    top: -10px;
    left: 200px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 10px 0 10px 15px;
    border-color: transparent transparent transparent red;
    content: '';
  }
}
</style>
