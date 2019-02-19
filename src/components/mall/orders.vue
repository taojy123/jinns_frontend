<template>
  <div class="orderPay paddingtop">
    <son-header center-mes="我的订单"></son-header>

    <tab v-model="tabIndex">
      <tab-item>全部订单</tab-item>
      <tab-item>待付款</tab-item>
      <tab-item>已付款</tab-item>
      <tab-item>已取消</tab-item>
    </tab>

    <div class="order-groups">
      <group v-for="order in orders" :key="order.id">
        <router-link class="footerA" :to="{ path: '/orderPay/' + order.order_number }">
          <cell :title="order.title" :value="order.get_status_display"></cell>
          <cell-box>
            <flexbox>
              <flexbox-item :span="3">
                <div>
                  <img :src="order.pic">
                </div>
              </flexbox-item>
              <flexbox-item :span="9">
                <div class="order-days">{{ order.starts_at }}至{{ order.ends_at }} 共{{order.days}}晚</div>
                <div class="order-price">订单总额：<span class="red">¥{{order.price}}元</span></div>
                <div class="order-remark">{{ order.remark }}</div>
              </flexbox-item>
            </flexbox>
          </cell-box>
        </router-link>
      </group>
    </div>

  </div>
</template>

<script>
import SonHeader from '../SonHeader/SonHeader'
import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'

export default {
  name: 'orderPay',
  components:{SonHeader},
  data () {
    return {
      tabIndex: 0,
      orders: [],
      filters: {},
    }
  },
  mounted() {
    this.fetchList()
  },
  methods: {
    fetchList(){
      this.$axios.get(`/api/customer/orders/`, {params: this.filters}).then(res => {
        console.log(res.data)
        this.orders = res.data.results || res.data
      })
    }
  },
  watch: {
    tabIndex(newVal, oldVal) {
      if(newVal === 0){
        this.filters = {}
      } else if (newVal === 1){
        this.filters = {'status': 'pending'}
      } else if (newVal === 2){
        this.filters = {'status': 'paid'}
      } else if (newVal === 3){
        this.filters = {'status__in': 'refunding,refund,cancel'}
      }
      this.fetchList()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

  .paddingtop {
    padding-top: 50px;
  }

  .order-groups a {
    color: black;
  }

  .order-groups {
    background-color: #f5f5f5;
    margin-top: -20px;
    padding-top: 20px;
    min-height: calc(100vh - 100px);
  }

  .order-days {
    font-size: 0.85rem;
  }

  .order-price {
    font-size: 0.85rem;
  }

  .order-remark {
    font-size: 0.75rem;
    color:gray;
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

