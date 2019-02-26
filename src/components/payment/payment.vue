<template>
  <div class="payment">

    <group class="order-list">
      <cell :title="order.get_status_display + '订单'" :value="orderNumber"></cell>
      <cell-box v-for="item in order.order_rooms" :key="item.id">
        <flexbox>
          <flexbox-item :span="3">
            <div>
              <img :src="item.room.pic">
            </div>
          </flexbox-item>
          <flexbox-item :span="7">
            <div class="name">{{ item.room.name }}</div>
            <div class="price">¥ {{ item.room.price }}</div>
          </flexbox-item>
          <flexbox-item :span="2">
            <div class="quantity">× {{ item.quantity }}</div>
          </flexbox-item>
        </flexbox>
      </cell-box>
      <cell-box v-for="item in order.order_products" :key="item.id">
        <flexbox>
          <flexbox-item :span="3">
            <div>
              <img :src="item.product.pic">
            </div>
          </flexbox-item>
          <flexbox-item :span="7">
            <div class="name">{{ item.product.name }}</div>
            <div class="price">¥ {{ item.product.price }}</div>
          </flexbox-item>
          <flexbox-item :span="2">
            <div class="quantity">× {{ item.quantity }}</div>
          </flexbox-item>
        </flexbox>
      </cell-box>
      <cell-box>
        <flexbox>
          <flexbox-item :span="3">
            <div class="price-title">总计:</div>
          </flexbox-item>
          <flexbox-item :span="7">
            <div class="price">¥ {{ order.price }}</div>
          </flexbox-item>
          <flexbox-item :span="2">
          </flexbox-item>
        </flexbox>
      </cell-box>
    </group>

    <group title="可选择优惠券" v-if="coupon_codes.length">
      <radio :options="coupon_codes" :selected-label-style="{color: '#FF9900'}" v-model="coupon_code_id"></radio>
    </group>

    <group title="可选择抵扣方式" v-if="channels.length">
      <radio :options="channels" :selected-label-style="{color: '#FF9900'}" v-model="channel"></radio>
    </group>

    <div class="footer">
      <div class="sub01"><span class="span1">还需支付:</span><span class="price">¥ {{ remain_price }}</span></div>
      <div class="footerBut" @click="test">确定支付</div>
    </div>

  </div>
</template>

<script>
import SonHeader from '../SonHeader/SonHeader'
import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'

export default {
  name: 'roomOrder',
  components:{SonHeader},
  data () {
    return {
      orderNumber: this.$root.$route.params.orderNumber,
      order: {},
      coupon_codes: [],
      coupon_code_id: '',
      channel: '',
      customer_ready: false,
    }
  },
  mounted() {
    document.title = '支付订单'
    this.$axios.get(`/api/customer/orders/${this.orderNumber}/`).then(res => {
      console.log(res.data)
      this.order = res.data
    })
    this.$axios.get(`/api/customer/orders/${this.orderNumber}/coupon_codes/`).then(res => {
      console.log(res.data)
      this.coupon_codes = res.data
    })
    this.fetch_customer_ready()
  },
  methods: {
    test() {
      console.log(this.$customer)
    },
    fetch_customer_ready() {
      this.customer_ready = this.$customer && (this.$customer.pending == false)
      if (!this.customer_ready) {
        setTimeout(this.fetch_customer_ready, 1000)
      }
    }
  },
  computed: {
    remain_price() {
      let total_price = this.order.price
      let coupon_code
      for (coupon_code of this.coupon_codes) {
        if (this.coupon_code_id == coupon_code.id) {
          total_price -= coupon_code.coupon.price
        }
      }
      if (this.channel === 'balance') {
        total_price -= this.$customer.balance
      }
      if (this.channel === 'points') {
        total_price -= this.$customer.points / 100
      }
      if (total_price < 0) {
        total_price = 0
      }
      return total_price
    },
    channels(){
      if (!this.customer_ready) {
        return []
      }
      return [
        // {
        //   value: `不抵扣`,
        //   key: '',
        // },
        {
          value: `账户余额 [剩余: ${this.$customer.balance}]`,
          key: 'balance',
        },
        {
          value: `个人积分 [剩余: ${this.$customer.points}] 100积分=1元`,
          key: 'points',
        },
      ]
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

  .order-list{
    margin-bottom: 20px;
  }

  .price-title{
    float: right;
  }

  .price{
    color: red;
  }

  /*底部============= start*/
  .footer{ position: fixed; bottom: 0; left:0; right: 0; border-top: 1px solid #f0f0f0; height: 50px; background-color: #fff; z-index:999; padding-left: 10px;}
  .footerBut{ position: absolute; display:block;width: 151px; height: 51px; background-color: #f2a43a; font-size: 18px; text-align: center; line-height: 51px; top:-1px; right: 0px; color: #fff;}
  .footer .sub01,.footer .sub02{ display:inline-block; height: 50px; line-height: 50px; }
  .footer .sub01{ font-size: 20px; color: #000; margin-right: 30px;}
  .footer .sub01 .span1{ font-size: 13px; color: #505050; margin-right: 10px; }
  .footer .sub02{font-size: 13px; color: #505050; position: relative;}
  .footer .sub02:after{
    content: " ";
    display: inline-block;
    height: 5px;
    width: 5px;
    border-width: 1px 1px 0 0;
    border-color: #C8C8CD;
    border-style: solid;
    -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    position: relative;
    top: -2px;
    position: absolute;
    top: 50%;
    margin-top: -3px;
    right: -8px;
  }
  /*底部============= end*/


  @media screen and (max-width: 768px){

  }
  @media screen and (max-width: 375px){

  }
  @media screen and (max-width: 360px){

  }
  @media screen and (max-width: 320px){

  }

</style>

