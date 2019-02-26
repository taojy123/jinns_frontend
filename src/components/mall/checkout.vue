<template>
  <div class="checkout">

    <div class="card1">
      <div class="title"><icon type="success"></icon>微商城订单确认</div>

      <div class="product-info">
        <div class="product-img"><img :src="product.pic" width="100%"></div>

        <group>
          <cell :title="product.name">
          </cell>
          <cell :title="'¥ ' + product.price">
            <inline-x-number :min="1" v-model="quantity"></inline-x-number>
          </cell>
          <cell>
            <span slot="title" class="total-price">¥ {{total_price}}</span>
            <span class="submit-button" @click="submit">提交订单</span>
          </cell>
        </group>

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
      quantity: 1,
    }
  },
  mounted() {
    document.title = '提交订单'
    this.$axios.get(`/api/mall/products/${this.productId}/`).then(res => {
      console.log(res.data)
      this.product = res.data
    })
  },
  methods: {
    submit() {
      const url = '/api/customer/orders/checkout/'
      const data = {
        category: 'mall',
        products: [{
          id: this.productId,
          count: this.quantity,
        }],
      }
      this.$axios.post(url, data).then(res => {
        console.log(res.data)
        const order_number = res.data.order_number
        this.$root.$router.push('/payment/' + order_number)
      }).catch(res => {
        this.$vux.toast.show({text: res.data.detail, type: 'warn'})
      })
    }
  },
  computed: {
    total_price() {
      return this.quantity * this.product.price
    },
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


  .vux-inline-x-number{
    margin-right: -5px;
  }

  .vux-inline-x-number  /deep/ .vux-number-input{
    font-size: 16px;
  }

  .total-price{
    color: red;
  }

  .submit-button{
    font-size: 16px;
    color: white;
    padding: 5px 13px;
    background: orange;
    border-radius: 4px;
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

