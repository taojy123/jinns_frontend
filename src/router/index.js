import Vue from 'vue'
import Router from 'vue-router'
import BookRoom from '@/components/BookRoom/BookRoom'

Vue.use(Router)

export default new Router({
  routes: [
    {
      //预订
      path: '/',
      name: 'BookRoom',
      component: BookRoom
    }
  ]
})
