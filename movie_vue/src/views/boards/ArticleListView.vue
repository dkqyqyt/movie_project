<template>
  <div>
      <h1 class="text-center">게시글</h1>
      <table class="table">
        <thead class="thead-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">제목</th>
                <th scope="col">영화</th>
                <th scope="col">작성자</th>
                <th scope="col">작성일</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(article,idx) in articles" :key="article.id">
                <th scope="row">{{ idx + 1 }}</th>
                <td>{{ article.title }}</td>
                <td>{{ article.movie.title }}</td>
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
    name: 'ArticleListView',
    computed: {
        ...mapState('CommunityModule',['articles','comments'])
    },
    methods: {
        ...mapActions('CommunityModule',['fetchArticles'])
    },
    created() {
        this.fetchArticles()
    }
}
</script>

<style>

</style>