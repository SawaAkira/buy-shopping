import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
Vue.prototype.$http=axios
import router from './router'
import store from './store'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
// 导入自适应的依赖
import 'amfe-flexible'

// 设置根元素的字体 （限制字体大小）
import { initRoot } from './utils/rem'
initRoot();
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
