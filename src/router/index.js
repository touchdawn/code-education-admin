import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Home from "@/views/Home";
import Login from "@/views/Login";
import AllCourse from "@/views/CourseControl/AllCourse";
import CourseDetail from "@/views/CourseControl/CourseDetail";
import AllVideo from "@/views/VideoControl/VideoAudit";


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },

  {
    path: '/home',
    name: 'homeAdmin',
    component: Home
  },


  {
    path: '/home/allVideo',
    name: 'allVideo',
    component: AllVideo
  },


  {
    path: '/course/courseAudit',
    name: 'courseAudit',
    component: AllCourse
  },

  {
    path: '/course/courseDetail',
    name: 'courseDetail',
    component: CourseDetail
  },

  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
