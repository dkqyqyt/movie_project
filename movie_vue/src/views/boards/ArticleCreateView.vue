<template>
  <div>
      <h1 class="text-center" v-if="isUpdate">게시글 수정</h1>
      <h1 class="text-center" v-else>Article Create</h1>

      <div class="form-group">
          <label for="title">title</label>
          <input class="form-control" v-model="articleData.title" id="title" type="text">
      </div>
      <div class="form-group">
          <label for="content">content</label>
          <textarea class="form-control" v-model="articleData.content" id="content" cols="30" rows="10"></textarea>
      </div>
      <button v-if="isUpdate" class="btn btn-primary" @click="updateArticle(articleData)">수정</button>
      <button v-else class="btn btn-primary" @click="createArticle(articleData)">작성</button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: 'ArticleCreateView',
    computed: {
        ...mapState('CommunityModule', ['selectedArticle']),
        isUpdate() {
            return this.$route.params.article_id
        }
    },
    data() {
        return {
            articleData: {
                title: null,
                content: null,
                movieId: this.$route.params.movie_id,
                articleId: this.$route.params.article_id
            },
        }
    },
    methods: {
        ...mapActions('CommunityModule', ['createArticle','updateArticle']),
        mapStateData() {
            this.articleData.title = this.selectedArticle.title
            this.articleData.content = this.selectedArticle.content
        }
    },
    created() {
        if(this.$route.params.article_id) {
            this.mapStateData()
        }
    }
}
</script>

<style>

</style>