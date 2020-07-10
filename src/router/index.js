import Vue from "vue"
import VueRouter from 'vue-router'
// import Login from "../components/Login/Login.vue"

const Login=()=>import(/*webpackChunkName:'login'*/ "../components/Login/Login.vue")


const Index=()=>import(/*webpackChunkName:'reader'*/"../components/Reader/Index.vue")

// import Index from "../components/Reader/Index.vue"

const welcome=()=>import(/*webpackChunkName:'reader'*/ "../components/Reader/welcome/welcome.vue")
// import welcome from "../components/Reader/welcome/welcome.vue"

const Select=()=>import(/*webpackChunkName:'reader'*/ "../components/Reader/select/select.vue")
// import Select from "../components/Reader/select/select.vue"

const Back=()=>import(/*webpackChunkName:'reader'*/ "../components/Reader/back/back.vue")
// import Back from "../components/Reader/back/back.vue"

const Borrow=()=>import(/*webpackChunkName:'reader'*/"../components/Reader/borrow/borrow.vue")
// import Borrow from "../components/Reader/borrow/borrow.vue"




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
