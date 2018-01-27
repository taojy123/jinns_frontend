<template>
  <div class="orderPay paddingtop">
    <son-header :center-mes="centermes"></son-header>
  </div>
</template>

<script>
import SonHeader from '../SonHeader/SonHeader'
export default {
  name: 'orderPay',
  components:{SonHeader},
  data () {
    return {
      centermes:'订单详情'
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
  @media screen and (max-width: 768px){
 
  }
  @media screen and (max-width: 375px){

  }
  @media screen and (max-width: 360px){
    
  }
  @media screen and (max-width: 320px){
    
  }
</style>

