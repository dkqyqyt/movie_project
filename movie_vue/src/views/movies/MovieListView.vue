<template>
  <div>
      <h1 class="text-center">영화</h1>
      <div class="movie-list-item row">
        <div class="col-lg-3 col-sm-6" v-for="movie in movies" :key="movie.id">
            <div class="card">
                <img :src="'http://image.tmdb.org/t/p/w185/'+ movie.poster_path" class="card-img-top" alt="영화 포스터">
                <div class="card-body">
                    <h5 class="card-title">{{ movie.title }} <span class="badge badge-info">{{ movie.vote_average }}</span></h5>
                    <h5>개봉일 : {{ movie.release_date }}</h5>
                    <div class="text-center">
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
        ...mapState('CommunityModule',['movies'])
    },
    methods: {
        ...mapActions('CommunityModule',['fetchMovies']),
        movieDetail(movieId) {
            this.$router.push({ name: 'MovieDetail', params: { id: movieId}})
        },
    },
    mounted() {
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
        border-radius: 10px;
    }
    img.card-img-top {
        border-radius: 10px;
    }
    div.btn btn-warning {
        margin: auto;
        width: 50%;
    }
</style>