<template>
  <div class="fillInOrder paddingtop">
    <son-header :center-mes="centermes"></son-header>
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
        共3晚
      </div>
      <p class="shuxian01"></p>
      <p class="shuxian02"></p>
    </div>
    <!--住店离店 end-->

    <!--房型房间数 start-->
    <div class="txddItem roomNum">
      <div class="titleDiv"><span class="icon txddIcon"></span>房型房间数</div>
      <group>
        <x-number class="cellItem" title="豪华大床房" :min="0" :max="8" :value="1"></x-number>
        <x-number class="cellItem" title="豪华双床房1" :min="0" :max="8" :value="1"></x-number>
      </group>
    </div>
    <!--房型房间数 end-->

    <!--填写信息 start-->
    <div class="txddItem writeMes">
      <div class="titleDiv"><span class="icon txddIcon"></span>填写信息</div>
      <group>
        <x-input title="姓名" name="username" placeholder="请输入姓名"></x-input>
        <x-input title="手机" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"></x-input>
        <x-input title="备注" placeholder="请输入您的备注信息"></x-input>
      </group>
    </div>
    <!--填写信息 end-->

    <!--请选择 start-->
    <div class="txddItem choose">
      <div class="titleDiv"><span class="icon txddIcon"></span>请选择</div>
      <group>
        <cell title="到店时间" :value="demo4" is-link @click.native="showPopup=true"></cell>
      </group>
      <div v-transfer-dom>
      <popup v-model="showPopup" class="checker-popup">
        <div class="chooseTime">
          <p class="popupTitle">请选择到店时间</p>
          <checker
          v-model="demo4"
          default-item-class="demo4-item"
          selected-item-class="demo4-item-selected"
          disabled-item-class="demo4-item-disabled">
            <checker-item value="14:00" @on-item-click="onItemClick"> 14:00</checker-item>
            <checker-item value="15:00" @on-item-click="onItemClick"> 15:00</checker-item>
            <checker-item value="16:00" @on-item-click="onItemClick"> 16:00</checker-item>
            <checker-item value="17:00" @on-item-click="onItemClick"> 17:00 </checker-item>
            <checker-item value="18:00" @on-item-click="onItemClick"> 18:00 </checker-item>
          </checker>
        </div>
      </popup>
    </div>
    </div>
    <!--请选择 end-->
    <div class="footer">
      <router-link class="footerBut" :to="{ path: '/' }">提交订单</router-link>
    </div>
  </div>
</template>

<script>
import SonHeader from '../SonHeader/SonHeader'
import { Calendar,Group, Cell,CellBox,XNumber,XInput,Checker,CheckerItem,TransferDom,Popup} from 'vux'
export default {
  name: 'fillInOrder',
  directives: {
    TransferDom
  },
  components:{SonHeader,Calendar,Group,Cell,CellBox,XNumber,XInput,Checker,CheckerItem,Popup},
  data () {
    return {
      centermes:'填写订单',
      checkIn: 'TODAY',
      checkOut: 'TODAY',
      title: '',
      demo4: '请选择',
      showPopup: false
    }
  },
  mounted() {
    
  },
  methods: {
    onItemClick (value, disabled) {
      console.log(value, disabled)
      if (!this.disabled) {
        this.showPopup = false
      }
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
  .fillInOrder{ background: #f4f4f4; }
  .titleDiv{ position: relative; height: 42px; border-top:1px solid #efefef; background: #fff; font-size: 17px; color: #000; 
    line-height: 42px; padding-left: 33px; margin-top:12px;}
  .cellItem{ font-size: 15px; color: #505050; }
  .popupTitle{ font-size: 16px; color: #000; height: 46px; line-height: 46px; text-align: center; background: #fbf9fd; 
    border-bottom: 1px solid #efefef;}
    
.chooseTime .vux-checker-box{ padding-top: 28px; }
.chooseTime .vux-checker-item{ height: 27px; line-height: 27px; border:1px solid #999; width:65px; text-align: center;
border-radius: 5px; color: #444444; margin-left: 16px; margin-bottom: 16px;}
  /*底部============= start*/
  .footer{ position: fixed; bottom: 0; left:0; right: 0; border-top: 1px solid #f0f0f0; height: 50px; background-color: #fff; z-index:999; padding-left: 10px;}
  .footerBut{ position: absolute; display:block;width: 151px; height: 51px; background-color: #f2a43a; font-size: 18px; text-align: center; line-height: 51px; top:-1px; right: 0px; color: #fff;}
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

