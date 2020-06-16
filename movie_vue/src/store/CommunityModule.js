import cookies from 'vue-cookies'
import axios from 'axios'
import swal from 'sweetalert'

import SERVER from '../api/drf'
import router from '../router'

export default{
    strict: process.env.NODE_ENV !== 'production',
    namespaced: true,
  state: {
    authToken: cookies.get('auth-token'),
    isAdmin: false,
    loginUsername: null,
    movies: [],
    articles: [],
    comments: [],
    selectedMovie: null,
    selectedArticle: null,
    articlesByMovie: [],
    recommendedMovies: [],
  },
  getters: {
    isLoggedIn: state => !!state.authToken,
    config: state => ({ headers: { Authorization: `JWT ${state.authToken}`}}),
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.authToken = token
      cookies.set('auth-token', token)
    },
    SET_USERDATA(state, user) {
        if(user.is_superuser) {
            state.isAdmin = true
        }else {
            state.isAdmin = false
        }
        state.loginUsername = user.username
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
    SELECT_ARTICLE(state, article) {
        state.selectedArticle = article
    },
    SET_COMMENTS(state, comments) {
      state.comments = comments
    },
    SET_ARTICLES_BY_MOVIE(state, articles) {
      state.articlesByMovie = articles
    },
    SET_RECOMMEND_MOVIES(state, movies) {
      state.recommendedMovies = movies
    }
  },
  actions: {
    postAuthData({ commit }, info) {
      const redirectUrl = info.redirectUrl
      delete info.redirectUrl
      axios.post(SERVER.URL + info.location, info.data)
        .then(res => {
          console.log(res.data)
          commit('SET_TOKEN', res.data.token)
          commit('SET_USERDATA', res.data.user)
          router.replace(redirectUrl || { name: 'Home'})
        })
        .catch(err => {
          console.log(err.response)
          if(err.response.data.username) {
            swal('아이디 : ' + err.response.data.username)
          }else if(err.response.data.password) {
            swal('비밀번호 : ' + err.response.data.password)
          }else if(err.response.data.password1) {
            swal('비밀번호 : ' + err.response.data.password1)
          }else if(err.response.data.password2) {
            swal('비밀번호 확인 : ' + err.response.data.password2)
          }else if(err.response.data.non_field_errors) {
            swal(""+ err.response.data.non_field_errors)
          }
        })
    },
    login({ dispatch }, loginData) {
      const redirectUrl = loginData.redirectUrl
      delete loginData.redirectUrl
      const info = {
        data: loginData,
        location: SERVER.ROUTES.login,
        redirectUrl: redirectUrl
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
          const user = {
            is_superuser: false,
            username: null,
          }
          commit('SET_USERDATA', user)
          cookies.remove('auth-token')
          router.replace({ name: 'Home' })
        })
        .catch(err => console.log(err.response.data))
    },
    fetchMovies({ commit }) {
      axios.get(SERVER.URL + SERVER.ROUTES.getMovies)
        .then(res => {
          commit('SET_MOVIES', res.data)
        })
        .catch(err => console.log(err.response.data))
    },
    fetchRecommendMovies({ commit,state }) {
      axios.get(SERVER.URL + SERVER.ROUTES.getMovies, {
        headers: {
          Authorization: `JWT ${state.authToken}`
        }
      })
        .then(res => {
          commit('SET_MOVIES', res.data)
        })
        .catch(err => console.log(err.response.data))
    },
    createMovie({ getters }, movieData) {
      delete movieData.movieId
      axios.post(SERVER.URL + SERVER.ROUTES.createMovie, movieData, getters.config)
        .then(res => {
          const movieId = res.data.id
          router.push({ name: 'MovieDetail', params: { id: movieId}})
        })
        .catch(err => {
          if(err.response.data) {
            swal('모든 항목은 필수 항목입니다.')
          }
        })
    },
    getMovieDetail({ commit }, movieId) {
        axios.get(SERVER.URL + SERVER.ROUTES.getMovies + movieId + '/')
            .then(res => {
                commit('SELECT_MOVIE', res.data)
            })
            .catch(err => console.log(err.response.data))
    },
    deleteMovie({ state } , movieId) {
      axios.delete(SERVER.URL + SERVER.ROUTES.movieDetail + movieId +'/', { 
          headers: {
              Authorization: `JWT ${state.authToken}`
          } 
        })
        .then(() => {
          router.replace({ name: 'MovieList'})
        })
        .catch(err => console.log(err.response.data))
    },
    updateMovie({ getters }, movieData) {
      const movieId = movieData.movieId
      delete movieData.movieId
      axios.put(SERVER.URL + SERVER.ROUTES.movieDetail + movieId + '/', movieData, getters.config)
        .then(() => {
          router.push({name: 'MovieDetail', params: { id: movieId }})
        })
        .catch(err => console.log(err.response.data))
    },
    fetchArticles({ commit, state }) {
      axios.get(SERVER.URL + SERVER.ROUTES.getArticles, {
        headers: {
          Authorization: `JWT ${state.authToken}`
        }
      })
        .then(res => {
          commit('SET_ARTICLES', res.data)
        })
        .catch(err => console.log(err.response.data))
    },
    getArticlesByMovie({ commit, state }, movieId) {
      axios.get(SERVER.URL + SERVER.ROUTES.getArticlesByMovie + movieId + '/', {
        headers: {
          Authorization: `JWT ${state.authToken}`
        }
      })
        .then(res => {
          console.log(res.data)
          commit('SET_ARTICLES_BY_MOVIE', res.data)
        })
        .catch(err => console.log(err.response.data))
    },
    createArticle({ getters }, articleData) {
      const movieId = articleData.movieId
      const newArticleData = {
        title: articleData.title,
        content: articleData.content,
        rating: articleData.rating
      }
      console.log(articleData)
      axios.post(SERVER.URL + SERVER.ROUTES.createArticle + movieId + '/', newArticleData, getters.config)
        .then(res => {
          router.push({ name: 'ArticleDetail', params: {article_id: res.data.id}})
        })
        .catch(err => {
          if(err.response.data) {
            swal('모든 항목은 필수 항목입니다.')
          }
        })
    },
    getArticleDetail({ commit, state } , articleId) {
        axios.get(SERVER.URL + SERVER.ROUTES.getArticleDetail + articleId + '/', {
          headers: {
            Authorization: `JWT ${state.authToken}`
          }
        })
            .then(res => {
                commit('SELECT_ARTICLE', res.data[0])
                commit('SET_COMMENTS', res.data[1])
            })
            .catch(err => console.log(err.response.data))
    },
    updateArticle({ getters }, articleData) {
      const articleId = articleData.articleId
      delete articleData.movieId
      delete articleData.articleId
      
      axios.put(SERVER.URL + SERVER.ROUTES.getArticleDetail + articleId + '/', articleData, getters.config)
        .then(() => {
          router.push({ name: 'ArticleDetail', params: { article_id: articleId}})
        })
        .catch(err => console.log(err.response.data))
    },
    deleteArticle({ state }, articleId) {
      axios.delete(SERVER.URL + SERVER.ROUTES.getArticleDetail + articleId + '/', {
        headers: {
          Authorization: `JWT ${state.authToken}`
        }
      })
        .then(() => {
          router.replace({ name: 'ArticleList' })
        })
        .catch(err => console.log(err.response.data))
    },
    createComment({ getters }, commentData) {
      const articleId = commentData.articleId
      delete commentData.articleId

      axios.post(
        SERVER.URL + SERVER.ROUTES.getArticleDetail + articleId + SERVER.ROUTES.createComment,
        commentData,
        getters.config
        )
        .then(() => {
          router.replace({ name: 'ArticleDetail', params: { article_id: articleId }})
        })
        .catch(err => console.log(err.response.data))
    },
    deleteComment({ state }, idData) {
      const articleId = idData.articleId
      const commentId = idData.commentId

      axios.delete(
        SERVER.URL + SERVER.ROUTES.getArticleDetail + articleId + SERVER.ROUTES.deleteComment + commentId +'/',{
        headers: {
          Authorization: `JWT ${state.authToken}`
        }
      })
      .then(() => {
        router.replace({ name: 'ArticleDetail', params: { article_id: articleId }})
      })
      .catch(err => console.log(err.response.data))
    },
    recommendMovies({ commit,state }, movieId) {
      axios.get(SERVER.URL + SERVER.ROUTES.recommendMovie + movieId + '/', {
        headers: {
          Authorization: `JWT ${state.authToken}`
        }
      })
        .then(res => {
          commit('SET_RECOMMEND_MOVIES', res.data)
          router.push({ name: 'MovieRecommend', params: { movie_id: movieId }})
        })
        .catch(err => console.log(err.response.data))

    }
  },
  modules: {

  }
}
