import Vue from 'vue'
import Router from 'vue-router'
import BookRoom from '@/components/BookRoom/BookRoom'
import fillInOrder from '@/components/fillInOrder/fillInOrder'
import BookSucess from '@/components/BookSucess/BookSucess'
import orderPay from '@/components/orderPay/orderPay'

Vue.use(Router)

export default new Router({
  routes: [
    {
      //预订
      path: '/',
      name: 'BookRoom',
      component: BookRoom
    },
    {
      //填写订单
      path: '/fillInOrder',
      name: 'fillInOrder',
      component: fillInOrder
    },
    {
      //预订成功
      path: '/BookSucess',
      name: 'BookSucess',
      component: BookSucess
    },
    {
      //订单支付
      path: '/orderPay',
      name: 'orderPay',
      component: orderPay
    }
  ]
})
