<template>
  <div class="SonHeader">
    <div class="leftHeadBut"><a class="icon leftIconArrow"></a></div>
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
	.SonHeader{height: 46px; background: #fff; position: fixed; left: 0; top:0; right: 0; z-index:499;border-bottom: 1px solid #f0f0f0;}
	.centerHeadText{ text-align: center; height: 46px; width: 100%; color: #666; font-size: 18px; line-height: 46px;}
	.leftHeadBut{width: 46px; height: 46px; position: absolute; left:0; top:0;}
	.rightHeadBut{width: 46px; height: 46px; position: absolute; right:0; top:0;}
	.leftIconArrow{ width: 20px; height: 20px; background-position: -22px 0px; margin-left:13px; margin-top: 13px;}
  @media screen and (max-width: 768px){
 
  }
  @media screen and (max-width: 375px){

  }
  @media screen and (max-width: 360px){
    
  }
  @media screen and (max-width: 320px){
    .header{height: 40px;}
    .centerHeadText{height: 40px; font-size: 16px; line-height: 40px;}
    .leftHeadBut,.rightHeadBut{width: 40px; height: 40px;}
    .leftIconArrow{margin-left:10px; margin-top: 10px;}
  }
</style>
