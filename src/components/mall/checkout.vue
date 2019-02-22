<template>
  <div class="checkout">

    <div class="card1">
      <div class="title"><icon type="success"></icon>微商城订单确认</div>
      <div class="product-info">
        <flexbox :gutter="0">
          <flexbox-item :span="3">
            <div class="product-img"><img :src="product.pic" width="100%"></div>
          </flexbox-item>
          <flexbox-item :span="9">
            <div class="product-list">
              <div class="product-name">{{product.name}}</div>
              <div class="product-price">
                ¥ {{product.price}}
              </div>
              <div class="quantity"><x-number :min="0" :max="99" v-model="quantity" align="left"></x-number></div>
            </div>
          </flexbox-item>
        </flexbox>
      </div>
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
  name: 'checkout',
  components:{mallFooter},
  data () {
    return {
      productId: this.$root.$route.params.productId,
      product: {},
      quantity: 1
    }
  },
  mounted() {
    this.$axios.get(`/api/mall/products/${this.productId}/`).then(res => {
      console.log(res.data)
      this.product = res.data
    })
  },
  methods: {
    buy() {
      alert('11')
    }
  },
  watch: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

  .checkout{
    background-color: #f8f8f8;
  }

  .card1{
    background-color: #fff;
  }

  .title{
    padding: 10px;
  }
  .product-info{
    background-color: #fafafa;
    padding: 10px;
  }

  .product-list div{
    padding: 4px;
  }

  .product-price{
    color: red;
    margin-left: 10px;
  }

  /deep/ .quantity .vux-number-input{
    font-size: 10px;
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

