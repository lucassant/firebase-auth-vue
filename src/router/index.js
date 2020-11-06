import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Login from '../views/Login'
import SignUp from '../views/SignUp'
import PhoneLogin from '../views/PhoneLogin'
import Counter from '../views/Counter'

import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '*',
    name: 'login',
    component: Login
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/phone',
    name: 'phone',
    component: PhoneLogin
  },
  {
    path: '/registrar',
    name: 'signUp',
    component: SignUp
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/counter',
    name: 'Counter',
    component: Counter,
    meta: {
      requiresAuth: true
    }
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

//checa se o usuário está logado antes de acessar alguma página
router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('home')
  else next()
})

export default router
