import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import LoginView from '../views/accounts/LoginView.vue'
import SignupView from '../views/accounts/SignupView.vue'
import LogoutView from '../views/accounts/LogoutView.vue'

import MovieListView from '../views/movies/MovieListView.vue'
import MovieCreateView from '../views/movies/MovieCreateView.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: Home,
    component: Home
  },
  {
    path: '/accounts/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/accounts/signup',
    name: 'Signup',
    component: SignupView
  },
  {
    path: '/accounts/logout',
    name: 'Logout',
    component: LogoutView
  },
  {
    path: '/movies',
    name: 'MovieList',
    component: MovieListView
  },
  {
    path: '/movies/create',
    name: 'MovieCreate',
    component: MovieCreateView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
