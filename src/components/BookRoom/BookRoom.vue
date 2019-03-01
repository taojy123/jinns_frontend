<template>
  <div class="bookRoom paddingBottom62">
    <Header center-mes="客房预订" :need-back="false"></Header>
    <!--弹出酒店详情 start-->
    <div class="popDialog" v-transfer-dom>
      <x-dialog v-model="showHideOnBlur" class="dialog-demo">
        <a class="icon popclose" @click="showHideOnBlur=false"></a>
        <div class="popLunbo">
          <swiper :list="popLuboList" style="width:100%;margin:0 auto;" :height="popSwiperHeight"
          :show-dots="true" dots-position="center">
          </swiper>
        </div>
        <div class="hotelMiaoshu">
          <h4>{{detailRoom.name}}</h4>
          <div class="hotelmsItem">
            <ul class="clearfix">
              <li class="clearfix">
                <span>面积</span>
                <p>{{detailRoom.area}}平方米</p>
              </li>
              <li class="clearfix">
                <span>床型</span>
                <p>{{detailRoom.bed_type}}</p>
              </li>
              <li class="clearfix">
                <span>窗户</span>
                <p>{{detailRoom.window}}</p>
              </li>
              <li class="clearfix">
                <span>床宽</span>
                <p>{{detailRoom.bed_width}}米</p>
              </li>
              <li class="clearfix">
                <span>入住人数</span>
                <p>{{detailRoom.capacity}}人</p>
              </li>
              <li class="clearfix">
                <span>所在楼层</span>
                <p>{{detailRoom.floor}}</p>
              </li>
            </ul>
          </div>
        </div>
        <!--<a class="hmsBut">快速预定</a>-->
      </x-dialog>
    </div>
    <!--弹出酒店详情 end-->
    <!--头部图片轮播 start-->
    <div class="jinnslunbo">
      <!--<div class="lunbotop"></div>-->
      <swiper :list="lunboList" style="width:100%;margin:0 auto;" :aspect-ratio="235/414" :show-dots="false"
      v-model="lunbo_index" @on-index-change="onIndexChange" v-if="lunboList">
      </swiper>
      <div class="buttomDiv clearfix">
        <div class="leftText">
          <h4>{{shop.name}}</h4>
          <div class="ltDiv clearfix">
            <div class="sub01"><span>{{shop.score}}</span>分</div>
            <div class="sub02"><span>{{shop.reviews_count}}</span>条评论</div>
          </div>
        </div>
        <div class="rightText">
          <div class="countDiv">
            <span>{{lunbo_index + 1}}</span>
            <span>/</span>
            <span>{{swiperImgCont}}</span>
          </div>
        </div>
      </div>
    </div>
    <!--头部图片轮播 end-->
    <!--地址 start-->
    <div class="address">
      <a href="https://map.baidu.com/mobile/webapp/index/index/vt=map" target="_blank">
        <span class="icon addressIcon"></span>
        <div class="addressText ellips">{{shop.address}}</div>
        <span class="rightArrowText">地图</span>
        <span class="icon rightArrowSmallIcon"></span>
      </a>
    </div>
    <!--地址 end -->
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
    <!--酒店列表 start-->
    <div class="hotelList">
      <div class="hotelItem" v-for="room in rooms" :key="room.id">
        <div class="hotelItemContent">
          <div class="hotelItemText">
            <div class="hotelName">{{room.name}}</div>
          </div>
          <div class="hotelMes clearfix">
            <span>{{room.bed_type}}</span>
            <span>{{room.window}}</span>
          </div>
          <div class="hotelPay">
            <a class="hotelPayTotal" @click="showXllist"><span>¥{{room.price}}</span>
            </a>
            <a class="icon hotelJian" :data-room-id="room.id" @click="additem"></a>
          </div>
          <div class="hotelImg" @click="showDetail(room)">
            <div class="hotelImgJianbian"></div>
            <img :src="room.pic">
          </div>
        </div>
      </div>

    </div>
    <!--酒店列表 end-->

    <!--加入购物车动画小球 start-->
    <div class="ball-container"><!--小球-->
        <div v-for="ball in balls">
            <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
                <div class="ball" v-show="ball.show">
                    <div class="inner inner-hook"></div>
                </div>
            </transition>
        </div>
    </div>
    <!--加入购物车动画小球 end-->

    <div class="footer">
      <a class="footerA br">
        <i class="iconfont icon-hotel"></i>
        <p>房量</p>
        <span class="count">{{ counthotelnum }}</span>
      </a>
      <router-link class="footerA br" :to="{ path: '/orders' }">
        <i class="iconfont icon-dingdan"></i>
        <p>订单</p>
      </router-link>
      <router-link class="footerA" :to="{ path: '/mall' }">
        <i class="iconfont icon-gouwu"></i>
        <p>微商城</p>
      </router-link>
      <!--<a class="footerA" :href="'tel:' + shop.phone">-->
        <!--<i class="iconfont icon-gouwu"></i>-->
        <!--<p>电话</p>-->
      <!--</a>-->
      <router-link class="footerBut" :to="{ path: pathurlparme }">立即预定</router-link>
    </div>

  </div>
</template>

<script>
import Header from '../Header/Header'
import { Swiper, Calendar, XDialog, TransferDomDirective as TransferDom } from 'vux'
import axios from 'axios'
import moment from 'moment'


const imgList = [
  require('../../assets/imgs/lunbo.jpg'),
  require('../../assets/imgs/lunbo.jpg')
]
const demoList = imgList.map((one, index) => ({
  // url: 'javascript:',
  img: one
}))

export default {
  name: 'BookRoom',
  directives: {
    TransferDom
  },
  components:{Header,Swiper,Calendar,XDialog},
  data () {
    return {
      lunboList: demoList,
      popLuboList: demoList,
      lunbo_index: 0,
      swiperImgCont: 0,
      popSwiperHeight: "0px",
      checkIn: 'TODAY',
      checkOut: moment().add(1, 'days').format('YYYY-MM-DD'),
      title: '',
      showHideOnBlur: false,
      detailRoom: {},
      xxList: false,
      counthotelnum: 0,
      bili: 0,
      balls: [ //小球 设为3个
          {
              show: false
          },
          {
              show: false
          },
          {
              show: false
          },
          {
              show: false
          },
          {
              show: false
          },
      ],
      dropBalls:[],
      shop: {},
      rooms: [],
      selectedRooms: {}
    }
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
    pathurlparme () {
      if(!this.counthotelnum){
        return
      }
      let url = '/fillInOrder?rooms='
      for(let roomId in this.selectedRooms){
        let count = this.selectedRooms[roomId]
        url += `${roomId}.${count},`
      }
      url += `&checkIn=${this.checkIn}&checkOut=${this.checkOut}`
      return url
    }
  },
  mounted() {
    document.title = '酒店预订'
    this.$login_by_openid('abcde12345')
    var that = this;
    that.swiperImgCont = imgList.length;
    that.bili = 235/360;
    that.popSwiperHeight = $(".popDialog .weui-dialog").width()*that.bili + "px";


    this.$axios.get('/api/book/rooms/').then(res => {
      const rooms = res.data.results || res.data
      this.rooms = rooms
    })

    this.$axios.get('/api/shop/shops/self/').then(res => {
      const shop = res.data
      this.shop = shop
      this.lunboList = []
      shop.pics.forEach(pic => {
        this.lunboList.push({img: pic})
      })
      this.swiperImgCont = this.lunboList.length
    })
  },
  methods: {
    onIndexChange (index) {
      var that = this;
      that.lunbo_index = index;
    },
    log (str) {
      console.log(str)
    },
    onChange (val) {
      console.log('on change', val)
    },
    showXllist (){
      var that = this;
      that.xxList = !that.xxList;
    },
    additem(event){
      var that = this;
      that.drop(event.target);
      that.counthotelnum ++;
      var roomId = event.target.getAttribute('data-room-id')
      that.selectedRooms[roomId] = that.selectedRooms[roomId] || 0
      that.selectedRooms[roomId] ++
      console.log(this.selectedRooms)
    },
    drop(el){ //抛物
        for(let i=0;i<this.balls.length;i++){
            let ball= this.balls[i];
            if(!ball.show){
                ball.show = true;
                ball.el=el;
                this.dropBalls.push(ball);
                return;
            }
        }
    },
    beforeDrop(el) {/* 购物车小球动画实现 */
        let count = this.balls.length;
        while (count--) {
            let ball = this.balls[count];
            if (ball.show) {
                let rect = ball.el.getBoundingClientRect(); //元素相对于视口的位置
                let x = rect.left - 32;
                let y = -(window.innerHeight - rect.top - 22);  //获取y
                el.style.display = '';
                el.style.webkitTransform = 'translateY('+y+'px)';  //translateY
                el.style.transform = 'translateY('+y+'px)';
                let inner = el.getElementsByClassName('inner-hook')[0];
                inner.style.webkitTransform = 'translateX('+x+'px)';
                inner.style.transform = 'translateX('+x+'px)';
            }
        }
    },
    dropping(el, done) { /*重置小球数量  样式重置*/
        let rf = el.offsetHeight;
        el.style.webkitTransform = 'translate3d(0,0,0)';
        el.style.transform = 'translate3d(0,0,0)';
        let inner = el.getElementsByClassName('inner-hook')[0];
        inner.style.webkitTransform = 'translate3d(0,0,0)';
        inner.style.transform = 'translate3d(0,0,0)';
        el.addEventListener('transitionend', done);
    },
    afterDrop(el) { /*初始化小球*/
        let ball = this.dropBalls.shift();
        if (ball) {
        ball.show=false;
        el.style.display = 'none';
      }
    },
    showDetail(room) {
      this.detailRoom = room
      this.popLuboList = []
      room.pics.forEach(pic => {
        this.popLuboList.push({img: pic})
      })
      this.showHideOnBlur = true
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.jinnslunbo{ position: relative; }
.buttomDiv{ position: absolute; color: #fff; bottom: 12px; left:10px; right: 10px;}
.leftText{ float: left; }
.leftText h4{ font-size: 17px; font-weight: normal; margin-left: 6px;}
.rightText{ float: right; }
.ltDiv .sub01,.ltDiv .sub02{ float: left; margin-left: 8px; margin-top: 10px;}
.ltDiv .sub02{ margin-left:16px; }
.ltDiv .sub01 span,.ltDiv .sub02 span{ margin-right: 8px; }
.countDiv{width: 60px; height: 23px; background: rgba(0,0,0,.45); border-radius: 60px; margin-top: 12px; line-height: 23px; text-align: center; margin-right: 6px;}
.lunbotop{
  position: absolute;
  top:0;
  left:0;
  right: 0;
  z-index: 998;
  height: 3em !important;
  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, rgba(0, 0, 0, 0.2)), to(rgba(0, 0, 0, 0))) !important;
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0.2) 100%) !important;
}
.address{ border-bottom: 1px solid #f0f0f0; position: relative; padding:20px;}
.addressText{ font-size: 14px; color:#484848; margin-left:18px;margin-right:35px;}
.addressIcon{ width: 17px; height: 17px; background-position:0 -37px; position: absolute; top:50%;
  margin-top: -8.5px; left:16px;}
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
.hotelItem{padding-left:16px; padding-right: 16px; margin-top:18px;}
.hotelItemContent{ position: relative; background-color: #fcfcfc; padding-left:13px; height: 128px; margin-bottom: 12px;}
.hotelImg{width: 128px; height: 128px; position: absolute; top:0; right: 0;}
.hotelImg img{ display: block; width: 100%; height: 100%; }
.hotelImgJianbian{
  position: absolute;
  top:0;
  left:0;
  z-index: 1;
  width: 60%;
  height: 100%;
  background-image: -webkit-linear-gradient(left, rgba(252, 252, 252, 1), rgba(0, 0, 0, 0)) !important;
  background-image: linear-gradient(to right, rgba(252, 252, 252, 1) 0, rgba(0, 0, 0, 0) 100%) !important;
}
.hotelName{ font-size: 16px; color: #444;}
.hotelDetail{ font-size: 12px; color: #666; height: 13px; border-left: 2px solid #dddddd; padding-left: 9px; margin-left:30px; width: 28.433%;}
.hotelName,.hotelDetail{ display: inline-block; vertical-align: middle; }
.hotelDetail span{ margin-right: 10px; }
.hotelMes{margin-top:15px; margin-bottom: 24px;}
.hotelMes span{ display:block; width: 56px; height: 17px; border:1px solid #DEDEDE; font-size: 12px;
  color: #ababab; text-align: center; line-height: 18px; float: left; margin-right: 10px;}
.hotelItemText{padding-top:18px;}
.hotelPayTotal{ font-size: 17px; color: #000; vertical-align: middle;}
.xxjtIcon{width: 10px; height: 7px; background-position: -10px -23px; margin-left: 10px; vertical-align: middle;}
.hotelJian{width: 20px; height: 20px; background-position: -22px -22px; vertical-align: middle; margin-left:10px;}
.xlListItem{ height: 60px; line-height: 60px; border-bottom: 1px dashed #f0f0f0; background: #fff;}
.xlListItem .hyName{ float: left; font-size: 18px; color: #f2a43a; margin-left:16px;}
.xlListItem .hyPay{ float: right; font-size: 14px; color: #666; margin-right: 16px;}
.xlList{margin-top:-12px; margin-bottom: -18px; border-top:1px dashed #f0f0f0;}
.xlList .xlListItem:last-child{ border-bottom: none; }
.hotelmsItem ul li{ float: left;width: 50%; margin-top:28px; }
.hotelmsItem ul li span{float: left; font-size: 16px; color: #8e8e93; margin-right: 13px; margin-left:18%;}
.hotelmsItem ul li p{float: left; font-size: 16px; color: #505050; }
.hmsBut{ position: absolute; width: 100%; left:0; bottom: 0; display: block; height: 42px; text-align: center; line-height: 42px; background-color: #f2a43a; color: #fff; font-size: 18px;}
.hotelMiaoshu{ margin-bottom:42px; padding-top:16px; padding-bottom:16px; }
.hotelmsItem{margin-top: 8px; margin-bottom: 32px;}
.hotelMiaoshu h4{ font-size: 17px; color: #444; font-weight: normal; }
.popclose{width: 30px; height: 30px; background-position: -94.33333px 0; position: absolute; right: -15px; top:-15px; z-index: 1;}
/*小球动画css*/
.shop{
     position: fixed;
     top: 300px;
     left: 40px;
 }
 .ball{
     position: fixed;
     left: 32px;
     bottom: 22px;
     z-index: 200;
     transition: all 0.4s cubic-bezier(0.49, 0.89, 0.75, 0.41); /*贝塞尔曲线*/
 }
 .inner{
     width: 16px;
     height: 16px;
     border-radius: 50%;
     background-color: #f8d850;
     transition: all 0.4s linear;
}
.cart{
    position: fixed;
    bottom: 22px;
    left: 32px;
    width: 30px;
    height: 30px;
    background-color: rgb(0,160,220);
    color: rgb(255,255,255);
}


/*footer*/
.footer{ position: fixed; bottom: 0; left:0; right: 0; border-top: 1px solid #f0f0f0; height: 50px; background-color: #fff; z-index:999; padding-left: 10px;}
.footerBut{ position: absolute; display:block;width: 151px; height: 51px; background-color: #f2a43a; font-size: 18px; text-align: center; line-height: 51px; top:-1px; right: 0px; color: #fff;}
.footerA{ display: inline-block; width: 58px; height: 36px; text-align: center; color: #505050; position: relative;font-size:10px; margin-top:7px;}
.footerA.br{ border-right: 1px solid #efefef; }
.phoneIcon,.kefuIcon,.fangliangIcon{ width: 20px; height: 20px; }
.phoneIcon{ background-position: -42px 0; }
.kefuIcon{background-position: -22px -45px;}
.fangliangIcon{background-position: -68px 0;}
.footerA .count{display:block; border-radius: 100%; background-color: #f2a43a; color: #fff;
  position: absolute; top:-5px; right: 10px; min-width: 18px; height: 18px; line-height: 18px;
  text-align: center;}

.footerA p{
  margin-top: 8px;
}


@media screen and (max-width: 375px){
  .checkInAndOut .sub01 a{ left:16%; }
  .checkInAndOut .sub02 a{ right:16%; }
  .hotelItemContent{ height: 115px; }
  .hotelImg{width: 115px; height: 115px;}
}
@media screen and (max-width: 360px){
  .checkInAndOut .sub01 a{ left:16%; }
  .checkInAndOut .sub02 a{ right:16%; }
  .hotelItemContent{ height: 110px; }
  .hotelImg{width: 110px; height: 110px;}
}
@media screen and (max-width: 320px){
  .addressIcon{left:10px;}
  .addressText{margin-left: 22px;}
  .checkInAndOut .sub01 a{ left:16px; }
  .checkInAndOut .sub02 a{ right:16px; }
  .address{padding:15px;}
  .checkInAndOut,.checkInAndOut .sub01,.checkInAndOut .sub02{height: 52px;}
  .checkState{margin-top: 10px; margin-bottom:5px;}
  .hotelItemContent{ height: 101px; }
  .hotelImg{width: 101px; height: 101px;}
  .leftText h4{ font-size: 15px;}
  .ltDiv .sub01,.ltDiv .sub02,.rightText{ font-size: 13px; }
  .leftText h4,.ltDiv .sub01{ margin-left: 0px; }
  .countDiv{ margin-right: 0px; }
  .leftIconArrow{ margin-left: 10px; }
  .hotelItem{ padding-left: 10px; padding-right: 10px;margin-top: 10px; }
  .countDiv{ width: 46px; height: 20px; line-height: 20px;}
  .addressText{ font-size: 12px; }
  .checkState{ font-size: 13px; }
  .checkTime .vux-calendar{ margin-top: 30%; }
  .checkInAndOut .sub03{ width: 46px; height: 18px; line-height: 18px; margin-left:-23px; margin-top:-9px; font-size: 12px;}
  .hotelName{ font-size: 14px; }
  .hotelMes{ margin-top: 10px; margin-bottom: 15px; }
  .hotelMes span{width:43px; height: 13px; line-height: 14px; font-size: 10px; margin-right: 8px;}
  .hotelItemText{ padding-top:14px; }
  .hotelPayTotal{ font-size: 15px; }
  .xlListItem{ height: 46px; line-height: 46px; }
  .xlListItem .hyName{ font-size: 14px; }
  .xlListItem .hyPay{ font-size: 12px; }
  .hotelMiaoshu{ padding-top:12px; }
  .hotelMiaoshu h4{ font-size: 15px; }
  .hotelmsItem ul li span,.hotelmsItem ul li p{ font-size: 13px; }
  .hotelmsItem ul li{margin-top:22px;}
  .hotelmsItem{ margin-bottom: 10px; margin-top:6px; }
  .hmsBut{ height: 32px; line-height: 32px; font-size: 15px; }
  .hotelJian{ width: 15px; height: 15px; background-size:225px 225px; background-position: -16.5px -16.5px;}
  .footer{height: 39px; padding-left: 8px;}
  .footerBut{width: 116px; height: 40px;font-size: 16px;line-height: 40px;}
  .footerA{width: 45px; height: 28px;font-size:8px; margin-top:5px;}
  .footerA .count{top:-3px; right: 4px;}
}
</style>

