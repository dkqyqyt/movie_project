<template>
  <div>
      <h1 class="text-center">Article Create</h1>

      <div class="form-group">
          <label for="title">title</label>
          <input class="form-control" v-model="articleData.title" id="title" type="text">
      </div>
      <div class="form-group">
          <label for="content">content</label>
          <textarea class="form-control" v-model="articleData.content" id="content" cols="30" rows="10"></textarea>
      </div>
      <button class="btn btn-primary" @click="createArticle(articleData)">작성</button>
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