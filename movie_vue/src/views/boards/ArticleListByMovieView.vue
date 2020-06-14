<template>
  <div>
      <h1 class="text-center">{{ selectedMovie.title }}</h1>
      <table class="table">
        <thead class="thead-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">제목</th>
                <th scope="col">영화</th>
                <th scope="col">평점</th>
                <th scope="col">작성자</th>
                <th scope="col">작성일</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(article,idx) in articlesByMovie" :key="article.id">
                <th scope="row">{{ idx + 1 }}</th>
                <td @click="moveToArticleDetail(article.id)" class="article-title">{{ article.title }}</td>
                <td @click="moveToMovie(article.movie.id)" class="article-movie">{{ article.movie.title }}</td>
                <td>{{ article.rating }}</td>
                <td>{{ article.user.username }}</td>
                <td>{{ article.created_at }}</td>
            </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: 'ArticleListByMovieView',
    computed: {
        ...mapState('CommunityModule',['articlesByMovie','selectedMovie'])
    },
    methods: {
        ...mapActions('CommunityModule',['getArticlesByMovie'])
    },
    created() {
        this.getArticlesByMovie(this.$route.params.movie_id)
    }
}
</script>

<style>

</style>