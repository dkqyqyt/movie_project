<template>
  <div>
      <h1 class="text-center">영화 생성</h1>
      <div class="movie-create-form">
        <div class="form-group">
            <label for="title">title</label>
            <input class="form-control" v-model="movieData.title" id="title" type="text">
        </div>
        <div class="form-group">
            <label for="original_title">original title</label>
            <input class="form-control" v-model="movieData.original_title" id="original_title" type="text">
        </div>
        <div class="form-group">
            <label for="release_date">release date</label>
            <input class="form-control" v-model="movieData.release_date" id="release_date" type="date">
        </div>
        <div class="form-group">
            <label for="popularity">popularity</label>
            <input class="form-control" v-model="movieData.popularity" id="popularity" type="number">
        </div>
        <div class="form-group">
            <label for="vote_count">vote count</label>
            <input class="form-control" v-model="movieData.vote_count" id="vote_count" type="number">
        </div>
        <div class="form-group">
            <label for="vote_average">vote average</label>
            <input class="form-control" v-model="movieData.vote_average" id="vote_average" type="number">
        </div>
        <div class="form-group">
            <label for="adult">adult</label>
            <input class="form-control" v-model="movieData.adult" id="adult" type="text">
        </div>
        <div class="form-group">
            <label for="overview">overview</label>
            <textarea class="form-control" v-model="movieData.overview" id="overview" cols="30" rows="10"></textarea>
        </div>
        <div class="form-group">
            <label for="original_language">original language</label>
            <input class="form-control" v-model="movieData.original_language" id="original_language" type="text">
        </div>
        <div class="form-group">
            <label for="poster_path">poster path</label>
            <input class="form-control" v-model="movieData.poster_path" id="poster_path" type="text">
        </div>
        <div class="form-group">
            <label for="backdrop_path">backdrop path</label>
            <input class="form-control" v-model="movieData.backdrop_path" id="backdrop_path" type="text">
        </div>
        <div class="form-group">
            <label for="genres">genres</label>
            <input class="form-control" v-model="genre" id="genres" type="text">
            <button class="btn btn-success btn-sm" @click="addGenre">장르 추가</button>
            <div class="genre-item">
                <span v-for="genre in movieData.genres" :key="genre">
                    {{ genre }}
                    <button class="btn btn-danger btn-sm" @click="deleteGenre(genre)">삭제</button>
                </span>
            </div>
        </div>
        <button class="btn btn-primary" @click="createMovie(movieData)">생성</button>
      </div>
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

<style scoped>
    div.movie-create-form {
        padding: 30px;
    }
</style>