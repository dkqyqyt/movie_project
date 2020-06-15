export default {
    URL: 'http://localhost:8000',
    ROUTES: {
        login: '/rest-auth/login/',
        signup: '/rest-auth/signup/',
        logout: '/rest-auth/logout/',
        getMovies: '/movies/',
        createMovie: '/movies/create/',
        movieDetail: '/movies/',
        updateMovie: '/update/',
        getArticles: '/boards/',
        getArticlesByMovie: '/boards/movies/',
        createArticle: '/boards/create/',
        getArticleDetail: '/boards/',
        createComment: '/comments/create/',
        deleteComment: '/comments/delete/',
        recommendMovie: '/movies/recommends/'
    }
}