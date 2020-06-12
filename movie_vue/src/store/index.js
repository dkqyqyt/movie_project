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
    selectedMovie: null,
    toUpdateMovie: null,
  },
  getters: {
    isLoggedIn: state => !!state.authToken,
    config: state => ({ headers: { Authorization: `Token ${state.authToken}`}}),
    getMovieById: (state) => (id) => {
      return state.movies.find(movie => movie.id === id)
    } 
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
    },
    SELECT_MOVIE(state, movie) {
      state.selectedMovie = movie
    },
    UPDATE_MOVIE(state, movie) {
      state.toUpdateMovie = movie
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
        .then(res => {
          console.log(res.data)
          router.push('/')
        })
        .catch(err => console.log(err.response.data))
    },

    getMovieDetail({ commit }, movieId) {
      axios.get(SERVER.URL + SERVER.ROUTES.movieDetail + movieId)
        .then(res => {
          // console.log(res.data)
          commit('SELECT_MOVIE', res.data)
        })
        .catch(err => console.log(err.response.data))
    },

    deleteMovie(context, movieId) {
      axios.delete(SERVER.URL + SERVER.ROUTES.movieDetail + movieId +'/')
        .then(res => {
          console.log(res)
          router.push({ name: 'MovieList'})
        })
        .catch(err => console.log(err.response.data))
    },

    getUpdateMovie({ commit,getters }, movieId) {
      const movie = getters.getMovieById(movieId)
      console.log(movie)
      commit('UPDATE_MOVIE', movie)
    },

    updateMovie({ getters,state }, movieData) {
      axios.put(SERVER.URL + SERVER.ROUTES.movieDetail + state.toUpdateMovie.id + '/', movieData, getters.config)
        .then(res => {
          console.log(res.data)
          router.push({name: 'MovieDetail', params: { id: state.toUpdateMovie.id }})
        })
        .catch(err => console.log(err.response.data))
    }
  },
  modules: {

  }
})
