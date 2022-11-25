import Vue from 'vue'
import App from './App.vue'
import Cookies from 'js-cookie'
import router from './router'
import axios from 'axios'
import Element from 'element-ui'
import "./assets/icon/iconfont.css";
import './assets/styles/element-variables.scss'
import '@/assets/styles/index.scss'

Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})
router.beforeEach((to,from,next) =>{
  if(to.meta.title){
    document.title = to.meta.title
  }
  next();
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
