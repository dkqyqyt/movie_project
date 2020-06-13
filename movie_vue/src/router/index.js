import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import LoginView from '../views/accounts/LoginView.vue'
import SignupView from '../views/accounts/SignupView.vue'
import LogoutView from '../views/accounts/LogoutView.vue'

import MovieListView from '../views/movies/MovieListView.vue'
import MovieCreateView from '../views/movies/MovieCreateView.vue'
import MovieDetailView from '../views/movies/MovieDetailView.vue'
import MovieDeleteView from '../views/movies/MovieDeleteView.vue'
import MovieUpdateView from '../views/movies/MovieUpdateView.vue'

import ArticleListView from '../views/boards/ArticleListView.vue'
import ArticleCreateView from '../views/boards/ArticleCreateView.vue'

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
  },
  {
    path: '/movies/:id',
    name: 'MovieDetail',
    component: MovieDetailView
  },
  {
    path: '/movies/:id/delete',
    name: 'MovieDelete',
    component: MovieDeleteView
  },
  {
    path: '/movies/:id/update',
    name: 'MovieUpdate',
    component: MovieUpdateView
  },
  {
    path: '/boards',
    name: 'ArticleList',
    component: ArticleListView
  },
  {
    path: '/boards/create/:movie_id',
    name: 'ArticleCreate',
    component: ArticleCreateView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
