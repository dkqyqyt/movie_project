<template>
  <div>
      <div v-if="!isSelected">
        <h1 class="text-center">영화 추천</h1>
        <h3 class="text-center">영화를 하나 선택해주세요!</h3>
        <div class="movie-list-item row">
            <div class="col-lg-3 col-sm-6" v-for="movie in movies" :key="movie.id">
                <div class="card">
                    <img :src="'http://image.tmdb.org/t/p/w185/'+ movie.poster_path" class="card-img-top" alt="영화 포스터">
                    <div class="card-body">
                        <h5 class="card-title">{{ movie.title }} <span class="badge badge-info">{{ movie.vote_average }}</span></h5>
                        <h5>개봉일 : {{ movie.release_date }}</h5>
                        <div class="text-center">
                        <button class="btn btn-warning" @click="recommendMovies(movie.id)">선택</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div v-else>
          <h1>영화 추천</h1>
          <div class="movie-list-item row">
            <div class="col-lg-3 col-sm-6" v-for="movie in recommendedMovies" :key="movie.id">
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
  </div>
</template>

<script>
import { mapActions,mapState } from 'vuex'

export default {
    name:'MovieListView',
    computed: {
        ...mapState('CommunityModule',['movies', 'recommendedMovies']),
        isSelected() {
            return this.$route.params.movie_id
        }
    },
    methods: {
        ...mapActions('CommunityModule',['fetchRecommendMovies', 'recommendMovies']),
        movieDetail(movieId) {
            this.$router.push({ name: 'MovieDetail', params: { id: movieId}})
        },
    },
    mounted() {
        this.fetchRecommendMovies()
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