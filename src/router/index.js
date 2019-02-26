import Vue from 'vue'
import Router from 'vue-router'
import BookRoom from '../components/BookRoom/BookRoom'
import fillInOrder from '../components/fillInOrder/fillInOrder'
import BookSucess from '../components/BookSucess/BookSucess'
import roomOrder from '../components/roomOrder/roomOrder'
import orders from '../components/orders/orders'
import mall from '../components/mall/mall'
import products from '../components/mall/products'
import product from '../components/mall/product'
import mallOrders from '../components/mall/orders'
import checkout from '../components/mall/checkout'
import payment from '../components/payment/payment'


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
      //订房订单
      path: '/roomOrder/:orderNumber',
      name: 'roomOrder',
      component: roomOrder
    },
    {
      //订单列表
      path: '/orders',
      name: 'orders',
      component: orders
    },
    {
      //微商城首页
      path: '/mall',
      name: 'mall',
      component: mall
    },
    {
      //商品列表
      path: '/products',
      name: 'products',
      component: products
    },
    {
      //商品详情
      path: '/products/:productId',
      name: 'product',
      component: product
    },
    {
      //商品详情
      path: '/checkout/:productId',
      name: 'checkout',
      component: checkout
    },
    {
      //商城订单列表
      path: '/mall/orders',
      name: 'mallOrders',
      component: mallOrders
    },
    {
      //支付订单
      path: '/payment/:orderNumber',
      name: 'payment',
      component: payment
    },
  ]
})
