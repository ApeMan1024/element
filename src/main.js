import Vue from 'vue'
import App from './App.vue'
import router from './router'

//按需映入element-ui
import "./element/index"

//引入全局样式
import "./assets/css/index.less"

//引入阿里巴巴字体库
import "./assets/font/iconfont.css"

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
