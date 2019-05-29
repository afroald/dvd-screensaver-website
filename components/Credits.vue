<template>
  <a
    :class="$style.link"
    href="https://roaldhacquebord.nl"
    target="_blank"
  >roald hacquebord</a>
</template>

<style lang="scss" module>
.link {
  font-family: Helvetica, sans-serif;
  color: #fff;
  opacity: .3;
  text-decoration: none;
  transition: opacity .06s ease-in-out;

  &:hover {
    opacity: 1;
    text-decoration: underline;
  }
}
</style>
