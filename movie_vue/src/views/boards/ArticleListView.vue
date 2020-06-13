<template>
  <div>
      <h1>Article List</h1>
      <ul>
          <li v-for="article in articles" :key="article.id">
              {{ article.title }}
          </li>
      </ul>
      <hr>
      <ul>
          <li v-for="comment in comments" :key="comment.id">
              {{ comment.content }}
          </li>
      </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: 'ArticleListView',
    computed: {
        ...mapState(['articles','comments'])
    },
    methods: {
        ...mapActions(['fetchArticles'])
    },
    created() {
        this.fetchArticles()
    }
}
</script>

<style>

</style>