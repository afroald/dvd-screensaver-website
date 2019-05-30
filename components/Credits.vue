<template>
  <div :class="$style.credits">
    <a
      :class="$style.link"
      href="https://github.com/afroald/dvd-screensaver-website"
      target="_blank"
    >source</a>
    —
    <a
      :class="$style.link"
      href="https://roaldhacquebord.nl"
      target="_blank"
    >roald hacquebord</a>
  </div>
</template>

<style lang="scss" module>
.credits {
  opacity: .15;
  transition: opacity .06s ease-in-out;

  &:hover {
    opacity: .8;
  }
}

.link {
  font-family: Helvetica, sans-serif;
  color: #fff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
</style>
