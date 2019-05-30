<template>
  <super-canvas>
    <!-- 1, 1 -->
    <super-line
      :p1="[100, 100]"
      :p2="[100 + 100, 100 + 100]"
    />
    <location-marker
      :x="100"
      :y="100"
    />
    <location-marker
      :x="200"
      :y="200"
    />

    <!-- -1, 1 -->
    <super-line
      :p1="[400, 100]"
      :p2="[400 - 100, 100 + 100]"
    />
    <location-marker
      :x="400"
      :y="100"
    />
    <location-marker
      :x="300"
      :y="200"
    />

    <!-- -1, -1 -->
    <super-line
      :p1="[600, 200]"
      :p2="[600 - 100, 200 - 100]"
    />
    <location-marker
      :x="600"
      :y="200"
    />
    <location-marker
      :x="500"
      :y="100"
    />

    <!-- 1, -1 -->
    <super-line
      :p1="[700, 200]"
      :p2="[700 + 100, 200 - 100]"
    />
    <location-marker
      :x="700"
      :y="200"
    />
    <location-marker
      :x="800"
      :y="100"
    />
  </super-canvas>
</template>

<script>
import SuperCanvas from '~/components/SuperCanvas';
import SuperLine from '~/components/SuperLine';
import LocationMarker from '~/components/LocationMarker';

export default {
  components: {
    SuperCanvas,
    SuperLine,
    LocationMarker,
  },
};
</script>
