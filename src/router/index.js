import Vue from "vue"
import VueRouter from 'vue-router'
import Login from "../components/Login/Login.vue"
import Index from "../components/Reader/Index.vue"
import welcome from "../components/Reader/welcome/welcome.vue"
import Select from "../components/Reader/select/select.vue"
import Back from "../components/Reader/back/back.vue"
import Borrow from "../components/Reader/borrow/borrow.vue"


Vue.use(VueRouter)

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  {
    path: "/index", component: Index,
    children: [
      { path: "welcome", component: welcome },
      { path: "select", component: Select },
      { path: "back", component: Back },
      { path: "borrow", component: Borrow }
    ],
    redirect: "/index/welcome"
  }
]

const router = new VueRouter({
  routes
})


const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


//全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.path.includes("/login")) return next()
  else {
    if (sessionStorage.getItem("token") && sessionStorage.getItem("token") != "undefined") return next()
    else return next("/login")
  }
})


export default router
