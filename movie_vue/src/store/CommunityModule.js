import cookies from 'vue-cookies'
import axios from 'axios'

import SERVER from '../api/drf'
import router from '../router'

export default{
    strict: process.env.NODE_ENV !== 'production',
    namespaced: true,
  state: {
    authToken: cookies.get('auth-token'),
    movies: [],
    articles: [],
    comments: [],
    selectedMovie: null,
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
    },
    SET_ARTICLES(state, articles) {
      state.articles = articles
    },
    SET_COMMENTS(state, comments) {
      state.comments = comments
    }
  },
  actions: {
    postAuthData({ commit }, info) {
      axios.post(SERVER.URL + info.location, info.data)
        .then(res => {
            console.log(res)
          commit('SET_TOKEN', res.data.key)
          router.push({ name: 'Home' })
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
          router.push({ name: 'Home' })
        })
        .catch(err => {
            console.log(err)
            commit('SET_TOKEN', null)
            cookies.remove('auth-token')
            router.push({ name: 'Home'})
        })
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
      delete movieData.movieId
      axios.post(SERVER.URL + SERVER.ROUTES.createMovie, movieData, getters.config)
        .then(res => {
          console.log(res.data)
          router.push('/')
        })
        .catch(err => console.log(err.response.data))
    },
    getMovieDetail({ commit }, movieId) {
        axios.get(SERVER.URL + SERVER.ROUTES.getMovies + movieId + '/')
            .then(res => {
                console.log(res.data)
                commit('SELECT_MOVIE', res.data)
                })
            .catch(err => console.log(err.response.data))
    },
    deleteMovie({ getters }, movieId) {
      axios.delete(SERVER.URL + SERVER.ROUTES.movieDetail + movieId +'/', null, getters.config)
        .then(res => {
            console.log(res)
          alert(res)

          router.push({ name: 'MovieList'})
        })
        .catch(err => console.log(err.response.data))
    },
    updateMovie({ getters }, movieData) {
        const movieId = movieData.movieId
        delete movieData.movieId
      axios.put(SERVER.URL + SERVER.ROUTES.movieDetail + movieId + '/', movieData, getters.config)
        .then(res => {
          console.log(res.data)
          router.push({name: 'MovieDetail', params: { id: movieId }})
        })
        .catch(err => console.log(err.response.data))
    },
    fetchArticles({ commit }) {
      axios.get(SERVER.URL + SERVER.ROUTES.getArticles)
        .then(res => {
          console.log(res.data)
          commit('SET_ARTICLES', res.data)
        })
        .catch(err => console.log(err.response.data))
    },
    createArticle({ getters }, articleData) {
      const movieId = articleData.movieId
      const newArticleData = {
        title: articleData.title,
        content: articleData.content
      }
      console.log(articleData)
      axios.post(SERVER.URL + SERVER.ROUTES.createArticle + movieId + '/', newArticleData, getters.config)
        .then(res => {
          console.log(res)
          router.push({ name: 'ArticleList' })
        })
        .catch(err => console.log(err.response.data))
    }
  },
  modules: {

  }
}
