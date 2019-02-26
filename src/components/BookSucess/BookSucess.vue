<template>
  <div class="BookSucess paddingtop">
    <!--明细弹出框 start-->
    <div v-transfer-dom>
      <popup v-model="detailed" position="left" width="100%">
        <div class="position-horizontal-demo">
          <p class="fjmxTitle" @click="detailed = true">订单明细</p>
          <div class="detailList">
            <group>
              <cell title="合计" :value="'¥'+order.price"></cell>
              <cell-form-preview :list="detailList"></cell-form-preview>
            </group>
          </div>
          <div class="detailTime">
            {{ order.starts_at }}入住，{{ order.ends_at }}离店
          </div>
          <span class="icon popclose" @click="detailed = false"></span>
        </div>
      </popup>
    </div>
    <!--明细弹出框 end-->
    <son-header center-mes="预订成功"></son-header>
    <div class="orderStateImg"><img src="../../assets/imgs/orderSucess.png"></div>
    <div class="orderStateText">
      <div class="osTit">预定成功</div>
      <div class="payTime">支付剩余时间：{{ remainTime }}</div>
      <div class="totalPay">房费总价：<span>¥{{ order.price }}</span> <a @click="detailed = true">订单详情</a></div>
    </div>
    <div class="orderbut" v-if="remainTime != '已超时'">
      <router-link :to="{ path: '/roomOrder/' + orderNumber }">
        <x-button :gradients="['#f2a43a', '#f8d850']">预付房费</x-button>
      </router-link>
    </div>
    <div class="bzDiv">
      备注：{{ order.remark || '无' }}
    </div>
  </div>
</template>

<script>
import SonHeader from '../SonHeader/SonHeader'
import { XButton,Popup,Group,Cell,CellFormPreview,TransferDom} from 'vux'
import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'


export default {
  name: 'BookSucess',
  directives: {
    TransferDom
  },
  components:{SonHeader,XButton,Popup,Group,Cell,CellFormPreview},
  data () {
    return {
      detailed: false,
      detailList: [],
      orderNumber: this.$root.$route.params.orderNumber,
      order: {},
      remainTime: ''
    }
  },
  mounted() {
    this.$axios.get(`/api/customer/orders/${this.orderNumber}/`).then(res => {
      console.log(res.data)
      this.order = res.data
      this.detailList = []
      _.forEach(this.order.order_rooms, item => {
        this.detailList.push({
          label: item.room.name,
          value: `${this.order.days}晚 ${item.quantity}间`
        })
      })
    })
    this.refreshRemainTime()
  },
  methods: {
    refreshRemainTime (){
      const createdAt = moment(this.order.created_at)
      const now = moment()
      const microseconds = now - createdAt
      const seconds = microseconds / 1000
      const remainSeconds = 15 * 60 - seconds
      if(remainSeconds <0 ){
        this.remainTime = '已超时'
        return
      }
      let result = ''
      if(remainSeconds > 60){
        result += `${parseInt(remainSeconds/60)}分钟`
      }
      result += `${parseInt(remainSeconds%60)}秒`
      this.remainTime = result
      setTimeout(this.refreshRemainTime, 1000)
    }
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .orderStateImg{width: 46%; margin:10% auto 8% auto;}
  .orderStateText{ text-align: center; }
  .osTit{ font-size: 1.25rem; color:#444; margin-bottom: 1.25rem;}
  .payTime{ font-size: 1rem; color:#f2a43a; margin-bottom: .25rem;}
  .totalPay{font-size: 1rem; color:#444; margin-bottom: 1.25rem;}
  .totalPay span{color:#f2a43a;}
  .totalPay a{ text-decoration: underline; font-size: .875rem; margin-left: .625rem; color: #284d8f;}
  .bzDiv{margin:1.25rem; font-size: .75rem; color: #999; line-height: 1.5;margin-top:2rem;}
  .orderbut{margin:1.25rem; margin-top:2.8rem;}
  /*订单明细*/
  .popclose{width: 30px; height: 30px; background-position: -94.33333px 0; position: absolute; top:6px; right: 6px;}
  .fjmxTitle{ width: 100%; height: 45px; text-align: center; line-height: 45px; font-size: 14px; color: #444; }
  .detailTime{ font-size: 14px; color: #444; padding-left: 15px; margin-top:15px; }
  .reminder{padding-left: 16px; padding-right: 16px; font-size: 14px; color: #505050; margin-top:16px; margin-bottom: 30px;
    text-align:justify;}
  .reminder p{ margin-bottom: 8px; }
  .reminder div{ line-height: 1.4; }
  @media screen and (max-width: 768px){

  }
  @media screen and (max-width: 375px){
  }
  @media screen and (max-width: 360px){

  }
  @media screen and (max-width: 320px){

  }
</style>

