import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import MusicHttp from './api/MusicHttp.js'
import 'element-ui/lib/theme-chalk/index.css'
import Message from './components/common/index'
import Toast from './components/common/Toast/index'
import Loading from './components/common/Loading/index'
Vue.use(Loading)
Vue.use(Toast)
//  Vue.prototype.$my_toast = Toast.install
Vue.prototype.$my_message = Message.install
Vue.prototype.$MusicHttp = MusicHttp
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
