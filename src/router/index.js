import Vue from 'vue'
import Router from 'vue-router'
import BookRoom from '@/components/BookRoom/BookRoom'
import fillInOrder from '@/components/fillInOrder/fillInOrder'
import BookSucess from '@/components/BookSucess/BookSucess'
import orderPay from '@/components/orderPay/orderPay'
import orders from '@/components/orders/orders'

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
      path: '/BookSucess/:orderNumber',
      name: 'BookSucess',
      component: BookSucess
    },
    {
      //订单支付
      path: '/orderPay/:orderNumber',
      name: 'orderPay',
      component: orderPay
    },
    {
      //订单列表
      path: '/orders',
      name: 'orders',
      component: orders
    },
  ]
})
