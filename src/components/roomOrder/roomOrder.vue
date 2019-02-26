<template>
  <div class="roomOrder paddingtop">
    <son-header center-mes="订单详情"></son-header>

    <group>
      <cell :title="orderNumber" :value="order.get_status_display"></cell>
      <cell-box v-for="orderRoom in order.order_rooms" :key="orderRoom.id">
        <flexbox>
          <flexbox-item :span="3">
            <div>
              <img :src="orderRoom.room.pic">
            </div>
          </flexbox-item>
          <flexbox-item :span="9">
            <div class="order-title">{{ orderRoom.room.name }}</div>
            <div class="order-remark">{{ orderRoom.quantity }} 间</div>
          </flexbox-item>
        </flexbox>
      </cell-box>
    </group>
    <card>
      <div slot="header" class="card-header">
        入住时间段
      </div>
      <div slot="content">
        <flexbox>
          <flexbox-item class="vux-1px-r">
            <div class="check-info check-action"><img src="../../assets/svg/login.svg"> 入住</div>
            <div class="check-info check-time">{{ order.starts_at }} {{ order.arrive || '12:00' }}</div>
          </flexbox-item>
          <flexbox-item>
            <div class="check-info check-action"><img src="../../assets/svg/logout.svg"> 退房</div>
            <div class="check-info check-time">{{ order.ends_at }} 12:00</div>
          </flexbox-item>
        </flexbox>
      </div>
    </card>
    <card>
      <div slot="header" class="card-header">
        入住人信息
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
      <div class="footerBut" @click="">去支付</div>
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
    }
  },
  mounted() {
    this.$axios.get(`/api/customer/orders/${this.orderNumber}/`).then(res => {
      console.log(res.data)
      this.order = res.data
    })
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

  .paddingtop {
    padding-top: 30px;
  }

  .order-title {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
  .order-remark {
    font-size: 0.75rem;
    color:gray;
  }

  .card-header {
    font-size: 1rem;
    padding: 12px;
    text-align: center;
    background-color: #f5f5f5;
  }

  .check-info {
    font-size: 1rem;
    text-align: center;
    margin: 5px;
  }

  .check-action {
    color: gray;
    padding-top: 15px;
    img{
      height: 30px;
      margin-top: -5px;
      fill: red;
    }
  }

  .check-time {
    padding-bottom: 15px;
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

