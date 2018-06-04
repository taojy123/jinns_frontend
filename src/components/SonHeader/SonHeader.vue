<template>
  <div class="SonHeader">
    <div class="leftHeadBut" @click="$root.$router.back()"><a class="icon leftIconArrow"></a></div>
    <div class="centerHeadText">{{centerMes}}</div>
    <div class="rightHeadBut"></div>
  </div>
</template>

<script>
export default {
  name: 'SonHeader',
  props: ['centerMes'],
  data () {
    return {

    }
  },
  mounted() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.SonHeader{height: 2.875rem; background: #fff; position: fixed; left: 0; top:0; right: 0; z-index:499;border-bottom: 1px solid #f0f0f0;}
  .centerHeadText{ text-align: center; height: 2.875rem; width: 100%; color: #666; font-size: 18px; line-height: 2.875rem;}
  .leftHeadBut{width: 2.875rem; height: 2.875rem; position: absolute; left:0; top:0;}
  .rightHeadBut{width: 2.875rem; height: 2.875rem; position: absolute; right:0; top:0;}
  .leftIconArrow{ width: 1.25rem; height: 1.25rem; background-position: -22px 0px; margin-left:0.8125rem; margin-top: 0.8125rem;}
  @media screen and (max-width: 768px){

  }
  @media screen and (max-width: 375px){

  }
  @media screen and (max-width: 360px){

  }
  @media screen and (max-width: 320px){

  }
</style>
