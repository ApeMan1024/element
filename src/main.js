import Vue from 'vue'
import App from './App.vue'
import router from './router'

//按需映入element-ui
import "./element/index"

//引入全局样式
import "./assets/css/index.less"

//引入阿里巴巴字体库
import "./assets/font/iconfont.css"

import axios from "axios"

Vue.config.productionTip = false

//配置公共的请求路径
axios.defaults.baseURL = "/tushu"


//请求拦截器
axios.interceptors.request.use((config) => {
  let url = config.url
  if (!url.includes("/login")||url.includes("/register")) {
    config.headers.token = sessionStorage.getItem("token")
  }
  return config;
}, (err) => {
  console.log(err)
})



Vue.prototype.$http = axios


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
