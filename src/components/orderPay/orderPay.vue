<template>
  <div class="orderPay paddingtop">
    <son-header center-mes="订单详情"></son-header>
    <card>
      <div slot="header">
        <span>{{ orderNumber }}</span>
        <span>{{ order.get_status_display }}</span>
      </div>
      <div slot="content">
        <div class="vux-1px-r">
          <img :src="order.pic">
        </div>
        <div>
          <div>{{ order.title }}</div>
          <div>{{ order.remark }}</div>
        </div>
      </div>
    </card>
    <card>
      <div slot="header">
        <span>入住时间段</span>
      </div>
      <div slot="content">
        <div class="vux-1px-r">
          <p>入住</p>
          <p>{{ order.starts_at }} {{ order.arrive || '12:00' }}</p>
        </div>
        <div>
          <p>退房</p>
          <p>{{ order.ends_at }} 12:00</p>
        </div>
      </div>
    </card>
    <card>
      <div slot="header">
        <span>入住人信息</span>
      </div>
      <div slot="content">
        <group>
          <cell title="真实姓名" :value="order.full_name"></cell>
          <cell title="联系方式" :value="order.mobile"></cell>
        </group>
      </div>
    </card>

    <div class="footer">
      <div class="sub01"><span class="span1">总价:</span><span>¥{{ order.price }}</span></div>
      <div class="footerBut" @click="">提交订单</div>
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
      orderNumber: this.$root.$route.params.orderNumber,
      order: {},
    }
  },
  mounted() {
    const url = `http://jinns.top/api/customer/orders/${this.orderNumber}/`
    axios.get(url).then(res => {
      console.log(res.data)
      this.order = res.data
    })
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

</style>

