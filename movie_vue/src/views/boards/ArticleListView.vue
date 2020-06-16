<template>
  <div>
      <h1 class="text-center">게시글</h1>
      <table class="table">
        <thead class="thead-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">글 제목</th>
                <th scope="col">영화</th>
                <!-- <th scope="col">장르</th> -->
                <th scope="col">평점</th>
                <th scope="col">작성자</th>
                <th scope="col">작성일</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(article,idx) in articles" :key="article.id">
                <th scope="row">{{ idx + 1 }}</th>
                <td @click="moveToArticleDetail(article.id)" class="article-title">{{ article.title }}</td>
                <td @click="moveToMovie(article.movie.id)" class="article-movie">{{ article.movie.title }}</td>
                <!-- <td v-for="genre in genres" :key>{{ article.movie.genre }}</td> -->
                <td>{{ article.rating }}</td>
                <td>{{ article.user.username }}</td>
                <td>{{ article.created_at }}</td>
            </tr>
        </tbody>
      </table>
        <h3 v-if="!articles.length" class="text-center">게시글이 없습니다.</h3>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: 'ArticleListView',
    computed: {
        ...mapState('CommunityModule',['articles','comments']),
        movieId() {
            return this.$route.params.movie_id
        }
    },
    methods: {
        ...mapActions('CommunityModule',['fetchArticles']),
        moveToMovie(movieId) {
            this.$router.push({ name: 'MovieDetail', params: {id: movieId}})
        },
        moveToArticleDetail(articleId) {
            this.$router.push({ name: 'ArticleDetail', params: {movie_id: this.movieId, article_id: articleId}})
        },
    },
    created() {
        this.fetchArticles()
    }
}
</script>

<style scoped>
    td.article-title:hover {
        /* background-color: lightgray; */
        cursor: pointer;
        color: blue;
        text-decoration: underline;
    }
    td.article-movie:hover {
        /* background-color: lightgray;  */
        cursor: pointer;
        color: blue;
        text-decoration: underline;
    }
</style>