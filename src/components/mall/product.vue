<template>
  <div class="product">

    <div class="product-img">
      <img :src="product.pic" width="100%">
    </div>

    <div class="product-info">
      <div class="product-name">{{product.name}}</div>
      <div class="product-description">{{product.description}}</div>
      <div class="product-buy">
        <div class="product-price">¥ {{product.price}}</div>
        <router-link class="buy-button" :to="{ path: '/checkout/' + productId }">立即购买</router-link>
      </div>
    </div>

    <div class="description-img">
      <img :src="product.description_pic" width="100%">
    </div>

    <mall-footer></mall-footer>

  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'
import mallFooter from "./footer"

export default {
  name: 'product',
  components:{mallFooter},
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

  .product-info{
    padding: 20px;
  }

  .product-name{
    font-size: 17px;
  }

  .product-description{
    font-size: 14px;
    color: #999;
    margin: 15px 0;
  }

  .product-buy{
    height: 30px;
  }

  .product-price{
    font-size: 18px;
    color: #f90;
    margin-top: 10px;
    float: left;
  }

  .buy-button{
    font-size: 18px;
    color: #fff;
    background-color: #f90;
    float: right;
    padding: 10px;
    border-radius: 3px;
    cursor: pointer;
  }

  .description-img{
    padding: 10px 5px;
    background-color: #f8f8f8;
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

