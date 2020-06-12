<template>
  <div>
      <h1>Movie Create</h1>
      <div>
          <label for="title">title: </label>
          <input v-model="movieData.title" id="title" type="text">
      </div>
      <div>
          <label for="original_title">original title: </label>
          <input v-model="movieData.original_title" id="original_title" type="text">
      </div>
      <div>
          <label for="release_date">release date: </label>
          <input v-model="movieData.release_date" id="release_date" type="date">
      </div>
      <div>
          <label for="popularity">popularity: </label>
          <input v-model="movieData.popularity" id="popularity" type="number">
      </div>
      <div>
          <label for="vote_count">vote count: </label>
          <input v-model="movieData.vote_count" id="vote_count" type="number">
      </div>
      <div>
          <label for="vote_average">vote average: </label>
          <input v-model="movieData.vote_average" id="vote_average" type="number">
      </div>
      <div>
          <label for="adult">adult: </label>
          <input v-model="movieData.adult" id="adult" type="text">
      </div>
      <div>
          <label for="overview">overview: </label>
          <textarea  v-model="movieData.overview" id="overview" cols="30" rows="10"></textarea>
      </div>
      <div>
          <label for="original_language">original language: </label>
          <input v-model="movieData.original_language" id="original_language" type="text">
      </div>
      <div>
          <label for="poster_path">poster path: </label>
          <input v-model="movieData.poster_path" id="poster_path" type="text">
      </div>
      <div>
          <label for="backdrop_path">backdrop path: </label>
          <input v-model="movieData.backdrop_path" id="backdrop_path" type="text">
      </div>
      <div>
          <label for="genres">genres: </label>
          <input v-model="genre" id="genres" type="text">
          <button @click="addGenre">add genre</button>
          <ul>
              <li v-for="genre in movieData.genres" :key="genre">
                  {{ genre }}
                  <button @click="deleteGenre(genre)">delete</button>
              </li>
          </ul>
      </div>
      <button @click="createMovie(movieData)">create</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'MovieCreateView',
    data() {
        return {
            movieData: {
                title: null,
                original_title: null,
                release_date: null,
                popularity: null,
                vote_count: null,
                vote_average: null,
                adult: null,
                overview: null,
                original_language: null,
                poster_path: null,
                backdrop_path: null,
                genres: [],
            },
            genre: "",
        }
    },
    methods: {
        ...mapActions(['createMovie']),
        addGenre() {
            if(this.genre){
                this.movieData.genres.push(this.genre)
            }
        },
        deleteGenre(genre) {
            const idx = this.movieData.genres.indexOf(genre)
            this.movieData.genres.splice(idx,1)
        }
    }
}
</script>

<style>

</style>