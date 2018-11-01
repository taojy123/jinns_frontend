<template>
  <div class="header">
    <div class="leftHeadBut" @click="$root.$router.back()"><a class="icon leftIconArrow"></a></div>
    <div class="centerHeadText">{{centerMes}}</div>
    <div class="rightHeadBut"></div>
  </div>
</template>

<script>
import '../../assets/js/jquery.min.js'
export default {
  name: 'Header',
  data () {
    return {
    }
  },
  props: ['centerMes'],
  mounted() {

    // 滑动滚动条改变头部状态
    $(window).scroll(function(){
      var scrollHeight = $(window).scrollTop();
      $('.header').css('background','rgba(255,255,255,' + (scrollHeight -50)/150 + ')');
      // console.log(scrollHeight);

      if(scrollHeight>=100){
        $('.header').addClass('active');
      }else{
        $('.header').removeClass('active');
      }

      if(scrollHeight>=200){
        $('.header').addClass('borderbottom');
      }else{
        $('.header').removeClass('borderbottom');
      }
    });

  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.header{height: 46px; background: rgba(255,255,255,0); position: fixed; left: 0; top:0; right: 0; z-index:499;}
	.centerHeadText{ text-align: center; height: 46px; width: 100%; color: #fff; font-size: 18px; line-height: 46px;}
  .header.active .centerHeadText{ color: #666;}
	.leftHeadBut{width: 46px; height: 46px; position: absolute; left:0; top:0;}
	.rightHeadBut{width: 46px; height: 46px; position: absolute; right:0; top:0;}
	.leftIconArrow{ width: 20px; height: 20px; background-position: 0px 0px; margin-left:13px; margin-top: 13px;}
  .header.active .leftIconArrow{background-position: -22px 0px;}
  .header.borderbottom{ border-bottom: 1px solid #f0f0f0; }
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

  .header {
    background: -webkit-linear-gradient(rgba(150,150,150,0.6), rgba(150,150,150,0)); /* Safari 5.1 - 6 */
    background: -o-linear-gradient(rgba(150,150,150,0.6), rgba(150,150,150,0)); /* Opera 11.1 - 12*/
    background: -moz-linear-gradient(rgba(150,150,150,0.6), rgba(150,150,150,0)); /* Firefox 3.6 - 15*/
    background: linear-gradient(rgba(150,150,150,0.6), rgba(150,150,150,0)); /* 标准的语法 */
  }


</style>
