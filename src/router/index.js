import Vue from 'vue'
import Router from 'vue-router'
import BookRoom from '@/components/BookRoom/BookRoom'
import fillInOrder from '@/components/fillInOrder/fillInOrder'

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
    }
  ]
})
