import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/icon/iconfont.css'
import VueResource from 'vue-resource'
import axios from 'axios'
import VueBus from 'vue-bus'
import { setCookie, getCookie, delCookie } from './util/util.js'

Vue.use(ElementUI)
Vue.use(VueResource)
Vue.use(VueBus)
Vue.prototype.baseUrl = 'http://localhost:8088/music/'
Vue.prototype.$axios = axios
axios.defaults.headers.common['token'] = 'f4c902c9ae5a2a9d8f84868ad064e706'
axios.defaults.headers.post['Content-type'] = 'application/json'
Vue.config.productionTip = false

Vue.prototype.Bus = new Vue()
Vue.prototype.$cookieStore = {
  setCookie,
  getCookie,
  delCookie
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
