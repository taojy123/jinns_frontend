// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import  { ToastPlugin, Actionsheet, Card, Flexbox, FlexboxItem, Group, Cell, CellBox, CellFormPreview } from 'vux'


Vue.use(ToastPlugin)
Vue.component('actionsheet', Actionsheet)
Vue.component('card', Card)
Vue.component('flexbox', Flexbox)
Vue.component('flexbox-item', FlexboxItem)
Vue.component('group', Group)
Vue.component('cell', Cell)
Vue.component('cell-box', CellBox)
Vue.component('cell-form-preview', CellFormPreview)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
