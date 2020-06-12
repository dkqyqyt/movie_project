<template>
  <div>
      <h1>Movie List</h1>
      <ul>
          <li v-for="movie in movies" :key="movie.id">
              <button @click="movieDetail(movie.id)">{{ movie.title }}</button>
          </li>
      </ul>
  </div>
</template>

<script>
import { mapActions,mapState } from 'vuex'
import router from '@/router'

export default {
    name:'MovieListView',
    computed: {
        ...mapState(['movies'])
    },
    methods: {
        ...mapActions(['fetchMovies']),
        movieDetail(movieId) {
            router.push({ name: 'MovieDetail', params: { id: movieId}})
        }
    },
    created() {
        this.fetchMovies()
    }
}
</script>

<style>

</style>