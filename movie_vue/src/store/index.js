import Vue from 'vue'
import Vuex from 'vuex'

import cookies from 'vue-cookies'
import axios from 'axios'

import SERVER from '../api/drf'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authToken: cookies.get('auth-token'),
    movies: [],
  },
  getters: {
    isLoggedIn: state => !!state.authToken,
    config: state => ({ headers: { Authorization: `Token ${state.authToken}`}})
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.authToken = token
      cookies.set('auth-token', token)
    },
    SET_MOVIES(state, movies) {
      state.movies = movies
    },
    ADD_MOVIE(state, movie) {
      state.movies.push(movie)
    }
  },
  actions: {
    postAuthData({ commit }, info) {
      axios.post(SERVER.URL + info.location, info.data)
        .then(res => {
          commit('SET_TOKEN', res.data.key)
          router.push('/')
        })
        .catch(err => console.log(err.response.data))
    },
    
    login({ dispatch }, loginData) {
      const info = {
        data: loginData,
        location: SERVER.ROUTES.login
      }
      dispatch('postAuthData', info)
    },

    signup({ dispatch }, signupData) {
      const info = {
        data: signupData,
        location: SERVER.ROUTES.signup
      }
      dispatch('postAuthData', info)
    },

    logout({ commit,getters }) {
      axios.post(SERVER.URL + SERVER.ROUTES.logout, null, getters.config)
        .then(() => {
          commit('SET_TOKEN', null)
          cookies.remove('auth-token')
          router.push('/')
        })
        .catch(err => console.log(err))
    },

    fetchMovies({ commit }) {
      axios.get(SERVER.URL + SERVER.ROUTES.getMovies)
        .then(res => {
          console.log(res)
          commit('SET_MOVIES', res.data)
        })
        .catch(err => console.log(err.response.data))
    },

    createMovie({ getters }, movieData) {
      axios.post(SERVER.URL + SERVER.ROUTES.createMovie, movieData, getters.config)
        .then(() => {
          router.push('/')
        })
        .catch(err => console.log(err.response.data))
    },
  },
  modules: {

  }
})
