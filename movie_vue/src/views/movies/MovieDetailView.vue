<template>
  <div>
      <h1 class="text-center">영화 정보</h1>
      <div class="mt-5" v-if="selectedMovie">
        <div class="movie-item">
            <h3>{{ selectedMovie.title }} <span class="badge badge-info">{{ selectedMovie.vote_average }}</span></h3>
            <p>{{ selectedMovie.original_title }}, {{ selectedMovie.release_date }}</p>
            <hr>
            <h5>장르</h5>
            <span class="badge badge-info genre" v-for="genre in selectedMovie.genres" :key="genre.id">{{ genre.name }}</span>
            <hr>
            <h5 v-if="selectedMovie.overview">줄거리</h5>
            <p>{{ selectedMovie.overview }}</p>
            <div class="d-flex justify-content-between">
                <button class="btn btn-primary" @click="createArticle">후기 작성</button>
                <div>
                    <button class="btn btn-secondary" @click="updateMovie">수정</button>
                    <button class="btn btn-danger" @click="deleteMovie">삭제</button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: 'MovieDetailView',
    computed: {
        ...mapState(['selectedMovie'])
    },
    methods: {
        ...mapActions(['getMovieDetail']),
        deleteMovie() {
            this.$router.push({ name: 'MovieDelete' })
        },
        updateMovie() {
            this.$router.push({ name: 'MovieUpdate'})
        },
        createArticle() {
            this.$router.push({ name: 'ArticleCreate', params:{ movie_id: this.$route.params.id}})
        }
    },
    created() {
        this.getMovieDetail(this.$route.params.id)
    }
}
</script>

<style scoped>

</style>