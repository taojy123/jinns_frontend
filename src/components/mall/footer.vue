<template>
  <div>
    <div class="footer-info">
      Jinns 提供技术支持
    </div>
    <div class="mall-footer">
      <flexbox :gutter="0">
        <flexbox-item>
          <div class="footer-item vux-1px-r">
            <router-link :to="{ path: '/mall' }">
              微商城
            </router-link>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="footer-item vux-1px-r">
            <router-link :to="{ path: '/products' }">
              全部商品
            </router-link>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="footer-item">
            <router-link :to="{ path: '/mall/orders' }">
              商城订单
            </router-link>
          </div>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mall-footer',
  props: [],
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

  .mall-footer{
    position: fixed;
    bottom: -1px;
    left:0;
    right: 0;
    border-top: 1px solid #f0f0f0;
    height: 40px;
    background-color: #fff;
    z-index:999;
  }

  .footer-item{
    text-align: center;
    /*border-left: 1px solid #f0f0f0;*/
    height: 40px;
    padding: 12px;
    font-weight: 300;
  }

  .footer-item a{
    color: black;
  }

  .footer-info{
    height: 80px;
    background: #f8f8f8;
    text-align: center;
    padding: 20px;
    color: #999;
    font-size: 0.8em;
  }

  @media screen and (max-width: 768px){

  }
  @media screen and (max-width: 375px){

  }
  @media screen and (max-width: 360px){

  }
  @media screen and (max-width: 320px){

  }
</style>
