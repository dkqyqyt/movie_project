<template>
  <div>
      <h1 class="text-center">영화 정보</h1>
      <div class="mt-5" v-if="selectedMovie">
        <div class="movie-item row">
            <div class="col-lg-3 text-center mt-5">
                <img :src="'http://image.tmdb.org/t/p/original/'+ selectedMovie.poster_path" class="card-img-top" alt="영화 포스터" style="width:200px; height:300px;">
            </div>
            <div class="col-lg-9 mt-5">                
                <h3>{{ selectedMovie.title }} <span class="badge badge-info">{{ selectedMovie.vote_average }}</span></h3>
                <p>{{ selectedMovie.original_title }}, {{ selectedMovie.release_date }}</p>
                <hr>
                <h3>장르</h3>
                <div class="badge badge-pill badge-info genre" v-for="genre in selectedMovie.genres" :key="genre.id">{{ genre.name }}</div>
                <hr>
                <h5 v-if="selectedMovie.overview">줄거리</h5>
                <p>{{ selectedMovie.overview }}</p>
                <div class="d-flex justify-content-between">
                    <div>
                        <button class="btn btn-primary" @click="createArticle">후기 작성</button>
                        <button class="btn btn-primary" @click="getArticleByMovie">관련 게시글 보기</button>
                    </div>
                    <div v-if="isAdmin">
                        <button class="btn btn-secondary" @click="updateMovie">수정</button>
                        <button class="btn btn-danger" @click="deleteMovie">삭제</button>
                    </div>               
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
        ...mapState('CommunityModule',['selectedMovie', 'isAdmin'])
    },
    methods: {
        ...mapActions('CommunityModule',['getMovieDetail']),
        deleteMovie() {
            this.$router.push({ name: 'MovieDelete' })
        },
        updateMovie() {
            this.$router.push({ name: 'MovieCreate', params: { movie_id: this.$route.params.id }},()=>{})
        },
        createArticle() {
            this.$router.push({ name: 'ArticleCreate', params:{ movie_id: this.$route.params.id}},()=>{})
        },
        getArticleByMovie() {
            this.$router.push({ name: 'ArticleListByMovie', params: { movie_id: this.$route.params.id }},()=>{})
        }
    },
    created() {
        this.getMovieDetail(this.$route.params.id)
    }
}
</script>

<style scoped>
    button {
        margin: 0 2px;
    }
</style>