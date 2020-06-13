<template>
  <div>
      <h1>Movie Detail</h1>
      <div v-if="selectedMovie">
        {{ selectedMovie.title }}
        <ul>
            <li v-for="genre in selectedMovie.genres" :key="genre">
                {{ genre }}
            </li>
        </ul>
        <button @click="deleteMovie">delete</button>
        <button @click="updateMovie">update</button>
        <button @click="createArticle">write article</button>
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

<style>

</style>