// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Tab, TabItem } from 'vux'
import axios from 'axios'
import  { ToastPlugin, Actionsheet, Card, Flexbox, FlexboxItem, Group, Cell, CellBox,
  CellFormPreview, Swiper, Divider, Icon, XNumber } from 'vux'


Vue.use(ToastPlugin)
Vue.component('actionsheet', Actionsheet)
Vue.component('card', Card)
Vue.component('flexbox', Flexbox)
Vue.component('flexbox-item', FlexboxItem)
Vue.component('group', Group)
Vue.component('cell', Cell)
Vue.component('cell-box', CellBox)
Vue.component('cell-form-preview', CellFormPreview)
Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)
Vue.component('swiper', Swiper)
Vue.component('divider', Divider)
Vue.component('icon', Icon)
Vue.component('x-number', XNumber)




// ==================== axios config ===========================

const $axios = axios.create({
  baseURL: 'https://jinns.top',
  headers: {
    'Content-Type': 'application/json'
  }
})

const customertoken = window.localStorage.getItem('customertoken')
if (customertoken) {
  $axios.defaults.headers.Authorization = 'customertoken ' + customertoken
}

$axios.interceptors.response.use((res) => {
  return res;
}, (err) => {
  if (err.response) {
    const res = err.response
    const error_message = res.data.detail || (res.data.non_field_errors && res.data.non_field_errors[0]) || res.data
    this.$vux.toast.show({text: error_message, type: 'warn'})
    if (res.status == 403 || res.status == 401) {
      goToLogin()
    }
  }
  return Promise.reject(err)
})

function goToLogin(){
  window.localStorage.clear()
  window.location.href = '/login/?next=' + encodeURIComponent(location.href)
}

Vue.prototype.$axios = $axios

// ==============================================================


// ================ get customer data (if login) =================
if (customertoken) {
  Vue.prototype.$customer = {'pending': true}
  $axios.get('/api/customer/customers/').then(res => {
    Vue.prototype.$customer = res.data
  })
} else {
  Vue.prototype.$customer = {}
}
// ===============================================================


// ================== login by openid =========================
Vue.prototype.$login_by_openid = (openid) => {
  $axios.get(`/api/customer/oauth/token/?openid=${openid}`).then(res => {
    const customertoken = res.data.token
    window.localStorage.setItem('customertoken', customertoken)
  })
}
// this.$login_by_openid('abcde12345')
// =============================================================


// Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})



