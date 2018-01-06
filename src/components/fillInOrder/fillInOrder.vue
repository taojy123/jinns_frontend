<template>
  <div class="fillInOrder">
    <son-header :center-mes="centermes"></son-header>

    <div class="footer">
      <router-link class="footerBut" :to="{ path: pathUrl }">提交订单</router-link>
    </div>
  </div>
</template>

<script>
import SonHeader from '../SonHeader/SonHeader'
export default {
  name: 'fillInOrder',
  components:{SonHeader},
  data () {
    return {
      centermes:'填写订单'
    }
  },
  mounted() {
    
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .footer{ position: fixed; bottom: 0; left:0; right: 0; border-top: 1px solid #f0f0f0; height: 50px; background-color: #fff; z-index:999; padding-left: 10px;}
  .footerBut{ position: absolute; display:block;width: 151px; height: 51px; background-color: #f2a43a; font-size: 18px; text-align: center; line-height: 51px; top:-1px; right: 0px; color: #fff;}

  @media screen and (max-width: 768px){
 
  }
  @media screen and (max-width: 375px){
  }
  @media screen and (max-width: 360px){
    
  }
  @media screen and (max-width: 320px){
    .footer{height: 39px; padding-left: 8px;}
    .footerBut{width: 116px; height: 40px;font-size: 16px;line-height: 40px;}
  }
</style>

