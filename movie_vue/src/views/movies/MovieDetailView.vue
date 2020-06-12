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
        }
    },
    created() {
        this.getMovieDetail(this.$route.params.id)
    }
}
</script>

<style>

</style>