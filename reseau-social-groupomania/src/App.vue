<template>
  <img alt="Logo Grouporama" src="../public/icones/icon-above-font.svg">
  <router-view></router-view>
</template>

<script>

  export default {
    name: 'App'
  }
</script>

<style lang="scss">
@import "./scss/_variables.scss";
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: $color-accent;
    // margin-top: 60px;
  }
  img {
    max-width: 50%;
  }
  input {
    padding: 5px;
  }
  .btn {
    background-color: white;
    color: $primary-color;
    border: 2px solid $primary-color;
    border-radius: 5px;
    margin-bottom: 10px;
    &:hover {
      background-color: $primary-color;
      color: white;
    }
  }
</style>
