<template>
  <div class="paddingtop">
    <!--<son-header center-mes="商品详情"></son-header>-->
    <Header center-mes="商品详情"></Header>

    <div style="margin-top: -50px">
      <img :src="product.pic" width="100%">
    </div>

    <div style="padding: 20px">
      <span style="float: left; font-size: 1.2em">{{product.name}}</span>
      <span style="float: right">¥ {{product.price}}</span>

    </div>

    <group>
      <cell title="真实姓名" :value="123"></cell>
      <cell title="联系方式" :value="123"></cell>
      <cell title="真实姓名" :value="123"></cell>
      <cell title="联系方式" :value="123"></cell>
    </group>


  </div>
</template>

<script>
  import SonHeader from '../SonHeader/SonHeader'
  import Header from '../Header/Header'
import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'

export default {
  name: 'product',
  components:{SonHeader, Header},
  data () {
    return {
      productId: this.$root.$route.params.productId,
      product: {},
    }
  },
  mounted() {
    this.$axios.get(`/api/mall/products/${this.productId}/`).then(res => {
      console.log(res.data)
      this.product = res.data
    })
  },
  methods: {
  },
  watch: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

  .paddingtop {
    padding-top: 50px;
  }

  .product-list a {
    color: black;
  }

  .product-list {
    min-height: calc(100vh - 100px);
    padding: 5px;
  }

  .item{
    padding: 5px;
  }

  .product-img {
    position:relative;
    width:100%;
    height:0;
    padding-top:100%;
  }

  .product-img img {
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    border-radius: 10px;
  }

  .product-name {
    text-align: center;
    margin: 5px;
    color: #999999;
  }

  .product-price {
    text-align: center;
    margin: 10px 0 20px 0;
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

