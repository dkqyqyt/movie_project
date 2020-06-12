<template>
  <div>
      <h1>Movie List</h1>
      <ul>
          <li v-for="movie in movies" :key="movie.id">
              {{ movie.title }}
          </li>
      </ul>
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
        ...mapActions(['fetchMovies'])
    },
    created() {
        this.fetchMovies()
    }
}
</script>

<style>

</style>