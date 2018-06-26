<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
require('./assets/css/reset.css')
require('./assets/css/common.css')
export default {
  name: 'app'
}
</script>

<style lang="less">
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/center.less';

  .red{
    color: red;
  }
</style>
