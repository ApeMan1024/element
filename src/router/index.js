import Vue from "vue"
import VueRouter from 'vue-router'
import Login from "../components/Login/Login.vue"
Vue.use(VueRouter)

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login }
]

const router = new VueRouter({
  routes
})

//全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.path.includes("/login")) return next()
  else {
    if (sessionStorage.getItem("token")) return next()
    else return next("/login")
  }
})


export default router
