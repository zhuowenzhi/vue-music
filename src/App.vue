<template>
  <div id="app">
    <Audio></Audio>
    <router-view/>
  </div>
</template>

<script>
import Audio from './components/Audio.vue'
export default {
  components: {
    Audio
  }
}
</script>
<style lang="scss">
  $main-color: #42b983;
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
  }

  html {
    font-size: 62.5%;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    background-color: #f5f5f5;
  }

  li {
    list-style: none;
  }

  body {
    width: 100%;
    font-size: 1.4rem;
    font-family: "Microsoft YaHei", 微软雅黑, STXihei, 华文细黑, STHeiti, serif;
    display: block;
    position: relative;
    margin: 0 auto;
  }

</style>
