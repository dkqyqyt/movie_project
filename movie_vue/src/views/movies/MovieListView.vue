<template>
  <div>
      <h1>Movie List</h1>
      <div class="movie-list-item row">
        <div class="col-3" v-for="movie in movies" :key="movie.id">
            <div class="card">
                <img :src="'http://image.tmdb.org/t/p/w185/'+ movie.poster_path" class="card-img-top" alt="영화 포스터">
                <div class="card-body">
                    <h5 class="card-title">{{ movie.title }} <span class="badge badge-info">{{ movie.vote_average }}</span></h5>
                    <h5>개봉일 : {{ movie.release_date }}</h5>
                    <button class="btn btn-warning" @click="movieDetail(movie.id)">상세 정보 보기</button>
                </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import { mapActions,mapState } from 'vuex'

export default {
    name:'MovieListView',
    computed: {
        ...mapState(['movies'])
    },
    methods: {
        ...mapActions(['fetchMovies']),
        movieDetail(movieId) {
            this.$router.push({ name: 'MovieDetail', params: { id: movieId}})
        },
    },
    created() {
        this.fetchMovies()
    }
}
</script>

<style scoped>
    div.movie-list-item {
        padding:2px;
    }
    div.card {
        margin: 5px 0;
    }
</style>