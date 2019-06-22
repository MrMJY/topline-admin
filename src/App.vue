<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: new Date()
    };
  }
};
</script>

<style lang="less">
#app {
  height: 100%;
}
</style>
