<template>
  <div class="fillInOrder paddingtop paddingBottom62">
    <son-header center-mes="填写订单"></son-header>
    <!--住店离店 start-->
    <div class="checkInAndOut clearfix">
      <div class="sub01">
        <a>
          <div class="checkState">
            <span class="cell">入住<span class="icon rightArrowSmallIcon"></span></span>
          </div>
          <div class="checkTime">
          <calendar :title="title" v-model="checkIn" disable-past></calendar>
          </div>
        </a>
      </div>
      <div class="sub02">
        <a>
          <div class="checkState">
            <span class="cell">离店<span class="icon rightArrowSmallIcon"></span></span>
          </div>
          <div class="checkTime">
            <calendar :title="title" v-model="checkOut" disable-past></calendar>
          </div>
        </a>
      </div>
      <div class="sub03">
        共{{checkDays}}晚
      </div>
      <p class="shuxian01"></p>
      <p class="shuxian02"></p>
    </div>
    <!--住店离店 end-->

    <!--房型房间 start-->
    <div class="txddItem roomNum">
      <div class="titleDiv"><span class="icon txddIcon"></span>房型房间</div>
      <group>
        <x-number v-for="room in rooms" :key="room.id" class="cellItem" :title="room.name" :min="1" :max="room.max" v-model="room.count"></x-number>
      </group>
    </div>
    <!--房型房间 end-->

    <!--填写信息 start-->
    <div class="txddItem writeMes">
      <div class="titleDiv"><span class="icon txddIcon"></span>填写信息</div>
      <group>
        <x-input title="姓名" name="username" placeholder="请输入姓名" v-model="fullName"></x-input>
        <x-input title="手机" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" v-model="mobile"></x-input>
        <x-input title="备注" placeholder="请输入您的备注信息" v-model="remark"></x-input>
      </group>
    </div>
    <!--填写信息 end-->

    <!--请选择 start-->
    <div class="txddItem choose">
      <div class="titleDiv"><span class="icon txddIcon"></span>请选择</div>
      <group>
        <cell title="到店时间" :value="checkInTime" is-link @click.native="showCheckTimePopup=true"></cell>
        <!--<cell title="优惠券" :value="Coupon" is-link @click.native="showCouponPopup=true"></cell>-->
      </group>
      <div v-transfer-dom>
        <popup v-model="showCheckTimePopup" class="checker-popup">
          <div class="chooseTime">
            <p class="popupTitle">请选择到店时间</p>
            <checker
            v-model="checkInTime"
            default-item-class="checkInTime-item"
            selected-item-class="checkInTime-item-selected">
              <checker-item value="14:00" @on-item-click="oncheckInTimeClick"> 14:00</checker-item>
              <checker-item value="15:00" @on-item-click="oncheckInTimeClick"> 15:00</checker-item>
              <checker-item value="16:00" @on-item-click="oncheckInTimeClick"> 16:00</checker-item>
              <checker-item value="17:00" @on-item-click="oncheckInTimeClick"> 17:00 </checker-item>
              <checker-item value="18:00" @on-item-click="oncheckInTimeClick"> 18:00 </checker-item>
              <checker-item value="19:00" @on-item-click="oncheckInTimeClick"> 19:00</checker-item>
              <checker-item value="20:00" @on-item-click="oncheckInTimeClick"> 20:00</checker-item>
              <checker-item value="21:00" @on-item-click="oncheckInTimeClick"> 21:00</checker-item>
              <checker-item value="22:00" @on-item-click="oncheckInTimeClick"> 22:00 </checker-item>
              <checker-item value="23:00" @on-item-click="oncheckInTimeClick"> 23:00 </checker-item>
              <checker-item value="24:00" @on-item-click="oncheckInTimeClick"> 24:00 </checker-item>
            </checker>
          </div>
        </popup>
      </div>
      <div v-transfer-dom>
        <popup v-model="showCouponPopup" class="checker-popup">
          <div class="chooseTime">
            <p class="popupTitle">请选择优惠券</p>
            <checker
            v-model="Coupon"
            default-item-class="checkInTime-item"
            selected-item-class="checkInTime-item-selected">
              <checker-item value="5元" @on-item-click="onCouponClick"> 5元</checker-item>
              <checker-item value="50元" @on-item-click="onCouponClick"> 50元</checker-item>
              <checker-item value="100元" @on-item-click="onCouponClick"> 100元</checker-item>
              <checker-item value="150元" @on-item-click="onCouponClick"> 150元 </checker-item>
              <checker-item value="200元" @on-item-click="onCouponClick"> 200元 </checker-item>
            </checker>
          </div>
        </popup>
      </div>
    </div>
    <!--请选择 end-->

    <!--温馨提示 start-->
    <div class="reminder">
      <p>温馨提示</p>
      <div>
        请于入住当日中午12:00后到酒店前台办理入住，如提前到店，视酒店空房情况安排。
      </div>
    </div>
    <!--温馨提示 end-->

    <!--明细弹出框 start-->
    <div v-transfer-dom>
      <popup v-model="detailed" position="left" width="100%">
        <div class="position-horizontal-demo">
          <p class="fjmxTitle">订单明细</p>
          <div class="detailList">
            <group>
              <cell title="合计" :value="'¥' + totalPrice"></cell>
              <cell-form-preview :list="detailList"></cell-form-preview>
            </group>
          </div>
          <div class="detailTime">
            {{ checkIn }}入住，{{ checkOut }}离店
          </div>
          <span class="icon popclose" @click="detailed = false"></span>
        </div>
      </popup>
    </div>
    <!--明细弹出框 end-->

    <div class="footer">
      <div class="sub01"><span class="span1">总价:</span><span>¥{{ totalPrice }}</span></div>
      <div class="sub02" @click="detailed = true">明细</div>
      <div class="footerBut" @click="onSubmit">提交订单</div>
    </div>
  </div>
</template>

<script>

import SonHeader from '../SonHeader/SonHeader'
import { Calendar,Group, Cell,CellBox,XNumber,XInput,Checker,CheckerItem,TransferDom,Popup,CellFormPreview} from 'vux'
import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'


export default {
  name: 'fillInOrder',
  directives: {
    TransferDom
  },
  components:{SonHeader,Calendar,Group,Cell,CellBox,XNumber,XInput,Checker,CheckerItem,Popup,CellFormPreview},
  data () {
    return {
      checkIn: 'TODAY',
      checkOut: moment().add(1, 'days').format('YYYY-MM-DD'),
      title: '',
      checkInTime: '请选择',
      Coupon: '请选择',
      showCheckTimePopup: false,
      showCouponPopup: false,
      detailed: false,
      rooms: [],
      fullName: '',
      mobile: '',
      remark: '',
    }
  },
  mounted() {
    this.checkIn = this.$route.query.checkIn || this.checkIn
    this.checkOut = this.$route.query.checkOut || this.checkOut
    const rooms = this.$route.query.rooms || ''
    const items = _.split(rooms, ',')
    _.forEach(items, (item) => {
      console.log(item)
      let temp = _.split(item, '.')
      if(temp.length === 2){
        let roomId = temp[0]
        let count = temp[1]
        this.$axios.get(`/api/book/rooms/${roomId}/`).then(res => {
          const roomData = res.data
          roomData.max = 10
          roomData.count = _.toInteger(count)
          this.rooms.push(roomData)
        })
      }
    })
  },
  computed: {
    checkDays () {
      const checkIn = moment(this.checkIn, 'YYYY-MM-DD')
      const checkOut = moment(this.checkOut, 'YYYY-MM-DD')
      const microseconds = checkOut - checkIn
      let days = microseconds / 1000 / 3600 / 24
      if(days <= 0){
        this.checkOut = checkIn.add(1, 'days').format('YYYY-MM-DD')
        days = 1
      }
      return days
    },
    totalPrice () {
      let t = 0
      _.forEach(this.rooms, (room) => {
        t += room.count * room.price * this.checkDays
      })
      return t
    },
    detailList () {
      let t = []
      _.forEach(this.rooms, (room) => {
        t.push({
          label: room.name,
          value: `${this.checkDays}晚 ${room.count}间`
        })
      })
      return t

    }
  },
  methods: {
    oncheckInTimeClick (value, disabled) {
      console.log(value, disabled)
      if (!this.disabled) {
        this.showCheckTimePopup = false
      }
    },
    onCouponClick (value, disabled) {
      console.log(value, disabled)
      if (!this.disabled) {
        this.showCouponPopup = false
      }
    },
    onSubmit () {
      const arrive = this.checkInTime !== '请选择' && this.checkInTime || ''
      if(!this.fullName || !this.mobile) {
        this.$vux.toast.show({
          text: '请填写姓名与手机',
          type: 'warn',
          width: '12em'
        })
        return
      }
      const url = '/api/customer/orders/checkout/'
      const data = {
        full_name: this.fullName,
        mobile: this.mobile,
        remark: this.remark,
        arrive,
        starts_at: this.checkIn,
        ends_at: this.checkOut,
        rooms: this.rooms,
      }
      this.$axios.post(url, data).then(res => {
        console.log(res.data)
        const orderNumber = res.data.order_number
        this.$root.$router.push('/BookSucess/' + orderNumber)
      }).catch(res => {
        this.$vux.toast.show({text: res.data.detail, type: 'warn'})
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .demo3-slot {
    text-align: center;
    padding: 8px 0;
    color: #888;
  }
  .txddIcon{ width: 12px; height: 22px; background-position:-129px 0; position: absolute; top: 0; left: 11px; }
  .fillInOrder{ background: #f4f4f4;}
  .titleDiv{ position: relative; height: 42px; border-top:1px solid #efefef; background: #fff; font-size: 17px; color: #000;
    line-height: 42px; padding-left: 33px; margin-top:12px;}
  .cellItem{ font-size: 15px; color: #505050; }
  .popupTitle{ font-size: 16px; color: #000; height: 46px; line-height: 46px; text-align: center; background: #fbf9fd;
    border-bottom: 1px solid #efefef;}

.chooseTime .vux-checker-box{ padding-top: 28px; padding-bottom: 28px;}
.chooseTime .vux-checker-item{ height: 26px; line-height: 26px;  width:58px; text-align: center;
border-radius: 5px; margin-left: 16px; margin-bottom: 16px;}
.checkInTime-item{border:1px solid #999;color: #666666;}
.checkInTime-item-selected {
  border:1px solid #f8d850;
  color: #f2a43a;
}
.popclose{width: 30px; height: 30px; background-position: -94.33333px 0; position: absolute; top:6px; right: 6px;}
.fjmxTitle{ width: 100%; height: 45px; text-align: center; line-height: 45px; font-size: 14px; color: #444; }
.detailTime{ font-size: 14px; color: #444; padding-left: 15px; margin-top:15px; }
.reminder{padding-left: 16px; padding-right: 16px; font-size: 14px; color: #505050; margin-top:16px; margin-bottom: 30px;
  text-align:justify;}
.reminder p{ margin-bottom: 8px; }
.reminder div{ line-height: 1.4; }
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
  /*住店离店========== 开始*/
  .checkInAndOut{ background: #fff; }
  .checkInAndOut{ width: 100%; height: 74px; border-bottom: 1px solid #f0f0f0; position: relative;}
  .checkInAndOut .sub01{float:left; width: 50%; height: 74px; position: relative;}
  .checkInAndOut .sub02{ float: right; width: 50%; height: 74px; position: relative; }
  .checkInAndOut .sub01 a,.checkInAndOut .sub02 a{ display: block; width: 95px; height: 100%; text-align: center;
    position: absolute;}
  .checkInAndOut .sub01 a{ left:20%; }
  .checkInAndOut .sub02 a{ right:20%; }
  .shuxian01,.shuxian02{ width: 1px; height: 12px; background: #f0f0f0; position: absolute; left: 50%;
    margin-left: -0.5px;}
  .checkInAndOut .sub03{ position:absolute; width: 60px; height: 24px; border:1px solid #f0f0f0; border-radius: 60px;
  text-align: center; top:50%; left: 50%; margin-top: -12px; margin-left: -30px; line-height: 25px; font-size: 13px;
  color:#484848;}
  .shuxian01{ top:0; }
  .shuxian02{ bottom: 0; }
  .checkState .cell{ position: relative; display: inline-block; }
  .checkState{ color: #000; font-size: 15px; margin-top: 16px; margin-bottom:8px;}
  .checkTime .time .vux-cell-value{ font-size: 14px; color: #484848;}
  .checkTime{ position: absolute; width: 100%;height: 100%; top:0; left: 0; }
  .checkState .rightArrowSmallIcon{ right: -14px;}
  /*住店离店========== 结束*/
  @media screen and (max-width: 768px){

  }
  @media screen and (max-width: 375px){
  }
  @media screen and (max-width: 360px){

  }
  @media screen and (max-width: 320px){
    .footer{height: 39px; padding-left: 8px;}
    .footerBut{width: 116px; height: 40px;font-size: 16px;line-height: 40px;}
  }
</style>

