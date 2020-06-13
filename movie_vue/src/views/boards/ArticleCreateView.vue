<template>
  <div>
      <h1>Article Create</h1>

      <div>
          <label for="title">title: </label>
          <input v-model="articleData.title" id="title" type="text">
      </div>
      <div>
          <label for="content">content: </label>
          <textarea v-model="articleData.content" id="content" cols="30" rows="10"></textarea>
      </div>
      <button @click="createArticle(articleData)">write</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'ArticleCreateView',
    data() {
        return {
            articleData: {
                title: null,
                content: null,
                movieId: this.$route.params.movie_id
            },
        }
    },
    methods: {
        ...mapActions(['createArticle'])
    }
}
</script>

<style>

</style>