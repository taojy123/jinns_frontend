<template>
  <div class="footer">
    <a class="footerA br">
      <span class="icon fangliangIcon"></span>
      <p>房量</p>
      <span class="count">{{childMsg}}</span>
    </a>
  	<a class="footerA br" href="tel:02155556666">
  		<span class="icon phoneIcon"></span>
  		<p>电话</p>
  	</a>
  	<a class="footerA" href="tel:02155556666">
  		<span class="icon kefuIcon"></span>
  		<p>客服</p>
  	</a>
    <router-link class="footerBut" :to="{ path: pathUrl }">立即预定</router-link>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  props: ['childMsg','pathUrl'],
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer{ position: fixed; bottom: 0; left:0; right: 0; border-top: 1px solid #f0f0f0; height: 50px; background-color: #fff; z-index:999; padding-left: 10px;}
.footerBut{ position: absolute; display:block;width: 151px; height: 51px; background-color: #f2a43a; font-size: 18px; text-align: center; line-height: 51px; top:-1px; right: 0px; color: #fff;}
.footerA{ display: inline-block; width: 58px; height: 36px; text-align: center; color: #505050; position: relative;font-size:10px; margin-top:7px;}
.footerA.br{ border-right: 1px solid #efefef; }
.phoneIcon,.kefuIcon,.fangliangIcon{ width: 20px; height: 20px; }
.phoneIcon{ background-position: -42px 0; }
.kefuIcon{background-position: -22px -45px;}
.fangliangIcon{background-position: -68px 0;}
.footerA .count{display:block; border-radius: 100%; background-color: #f2a43a; color: #fff;
position: absolute; top:-5px; right: 10px; min-width: 18px; height: 18px; line-height: 18px;
text-align: center;}

  @media screen and (max-width: 768px){

  }
  @media screen and (max-width: 375px){
  }
  @media screen and (max-width: 360px){

  }
  @media screen and (max-width: 320px){
    .footer{height: 39px; padding-left: 8px;}
    .footerBut{width: 116px; height: 40px;font-size: 16px;line-height: 40px;}
    .footerA{width: 45px; height: 28px;font-size:8px; margin-top:5px;}
    .footerA .count{top:-3px; right: 4px;}
  }
</style>
