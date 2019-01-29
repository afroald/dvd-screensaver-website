<template>
  <div :class="$style.canvas">
    <logo
      :color="logoColor"
      :x="logoPosition[0]"
      :y="logoPosition[1]"
      @click.native="tick"
    />
  </div>
</template>

<script>
import Logo from '~/components/Logo';
import dimensionsMixin from '~/mixins/dimensionsMixin';
import { add } from '~/lib/vector-math';
import createAnimationObserver from '~/lib/create-animation-observer';

const VELOCITY = 100; // pixels per second

export default {
  components: { Logo },
  mixins: [dimensionsMixin],
  data() {
    return {
      logoPosition: [0, 0],
    };
  },
  computed: {
    logoColor() {
      return this.$store.state.color;
    },
  },
  mounted() {
    this.animationObserver = createAnimationObserver();
    this.$nextTick(() => {
      this.animationSubscription = this.animationObserver.subscribe((interval) => {
        this.tick(interval);
      });
    });

    setInterval(() => {
      console.log('unsubscribing');
      this.animationSubscription.unsubscribe();
    }, 30 * 1000);
  },
  methods: {
    tick(interval) {
      const translation = interval * (VELOCITY / 1000);
      this.logoPosition = add(this.logoPosition, [translation, translation]);
    },
  },
};
</script>

<style module>
.canvas {
  width: 100vw;
  height: 100vh;
}
</style>
