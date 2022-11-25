import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import Element from 'element-ui'
import "./assets/icon/iconfont.css";

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

Vue.prototype.$http = axios
Vue.config.productionTip = false

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
