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

import ArticleListView from '../views/boards/ArticleListView.vue'
import ArticleCreateView from '../views/boards/ArticleCreateView.vue'
import ArticleDetailView from '../views/boards/ArticleDetailView.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
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
    path: '/movies/create/:movie_id?',
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
    path: '/boards',
    name: 'ArticleList',
    component: ArticleListView
  },
  {
    path: '/boards/create/:movie_id/:article_id?',
    name: 'ArticleCreate',
    component: ArticleCreateView
  },
  {
    path: '/boards/:article_id',
    name: 'ArticleDetail',
    component: ArticleDetailView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next) => {
  const publicPages = ['Login', 'Signup', 'MovieList', 'MovieDetail', 'ArticleList', 'Home']
  const authPages = ['Login', 'Signup']

  const authRequired = !publicPages.includes(to.name)
  const unauthRequired = authPages.includes(to.name)
  const isLogin = !!Vue.$cookies.isKey('auth-token')

  if(unauthRequired && isLogin) {
    next({ name: 'MovieList'})
  }

  if(authRequired && !isLogin) {
    next({ name: 'Login' })
  }else {
    next()
  }
})

export default router
