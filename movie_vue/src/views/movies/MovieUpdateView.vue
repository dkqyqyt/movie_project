<template>
  <div>
      <h1>Movie Update</h1>
      <button @click="mapStateData">기본 값 가져오기</button>
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
      <div class="form-group">
            <h5>장르</h5>
            <span class="form-check">
                <input class="form-check-input" v-model="movieData.genres" id="adult" type="checkbox" value="모험">
                <label class="form-check-label" for="adult">모험</label>
            </span>
            <span class="form-check">
                <input class="form-check-input" v-model="movieData.genres" id="adult" type="checkbox" value="액션">
                <label class="form-check-label" for="adult">액션</label>
            </span>
            <div class="form-check">
                <input class="form-check-input" v-model="movieData.genres" id="adult" type="checkbox" value="애니메이션">
                <label class="form-check-label" for="adult">애니메이션</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" v-model="movieData.genres" id="adult" type="checkbox" value="코미디">
                <label class="form-check-label" for="adult">코미디</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" v-model="movieData.genres" id="adult" type="checkbox" value="범죄">
                <label class="form-check-label" for="adult">범죄</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" v-model="movieData.genres" id="adult" type="checkbox" value="다큐멘터리">
                <label class="form-check-label" for="adult">다큐멘터리</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" v-model="movieData.genres" id="adult" type="checkbox" value="드라마">
                <label class="form-check-label" for="adult">드라마</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" v-model="movieData.genres" id="adult" type="checkbox" value="가족">
                <label class="form-check-label" for="adult">가족</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" v-model="movieData.genres" id="adult" type="checkbox" value="판타지">
                <label class="form-check-label" for="adult">판타지</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" v-model="movieData.genres" id="adult" type="checkbox" value="역사">
                <label class="form-check-label" for="adult">역사</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" v-model="movieData.genres" id="adult" type="checkbox" value="공포">
                <label class="form-check-label" for="adult">공포</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" v-model="movieData.genres" id="adult" type="checkbox" value="음악">
                <label class="form-check-label" for="adult">음악</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" v-model="movieData.genres" id="adult" type="checkbox" value="미스터리">
                <label class="form-check-label" for="adult">미스터리</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" v-model="movieData.genres" id="adult" type="checkbox" value="로맨스">
                <label class="form-check-label" for="adult">로맨스</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" v-model="movieData.genres" id="adult" type="checkbox" value="SF">
                <label class="form-check-label" for="adult">SF</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" v-model="movieData.genres" id="adult" type="checkbox" value="TV 영화">
                <label class="form-check-label" for="adult">TV 영화</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" v-model="movieData.genres" id="adult" type="checkbox" value="스릴러">
                <label class="form-check-label" for="adult">스릴러</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" v-model="movieData.genres" id="adult" type="checkbox" value="전쟁">
                <label class="form-check-label" for="adult">전쟁</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" v-model="movieData.genres" id="adult" type="checkbox" value="서부">
                <label class="form-check-label" for="adult">서부</label>
            </div>
        </div>
      <button @click="updateMovie(movieData)">update</button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: 'MovieUpdateView',
    computed: {
        ...mapState(['selectedMovie']),
    },
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
        ...mapActions(['getMovieDetail', 'updateMovie']),
        addGenre() {
            if(this.genre){
                this.movieData.genres.push(this.genre)
            }
        },
        deleteGenre(genre) {
            const idx = this.movieData.genres.indexOf(genre)
            this.movieData.genres.splice(idx,1)
        },
        mapStateData() {
            this.movieData.title = this.selectedMovie.title
            this.movieData.original_title = this.selectedMovie.original_title
            this.movieData.release_date = this.selectedMovie.release_date
            this.movieData.popularity = this.selectedMovie.popularity
            this.movieData.vote_count = this.selectedMovie.vote_count
            this.movieData.vote_average = this.selectedMovie.vote_average
            this.movieData.adult = this.selectedMovie.adult
            this.movieData.overview = this.selectedMovie.overview
            this.movieData.original_language = this.selectedMovie.original_language
            this.movieData.poster_path = this.selectedMovie.poster_path
            this.movieData.backdrop_path = this.selectedMovie.backdrop_path
            this.movieData.genres = this.selectedMovie.genres
        }
    },

    created() {
        this.getMovieDetail(this.$route.params.id)
    },
    mounted() {
        this.mapStateData()
    }
    
}
</script>

<style>

</style>