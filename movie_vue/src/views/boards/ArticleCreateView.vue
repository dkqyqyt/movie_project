<template>
  <div>
      <h1 class="text-center" v-if="isUpdate">게시글 수정</h1>
      <h1 class="text-center" v-else>게시글 작성</h1>

      <div class="form-group">
          <input class="form-control" v-model="articleData.title" id="title" type="text" placeholder="제목을 작성해주세요.">
      </div>
      <div class="form-group">
          <label for="rating">평점</label>
          <input class="form-control" v-model="articleData.rating" id="title" type="number" min=1 max=10
            placeholder="1점 에서 10점까지 가능합니다.">
      </div>
      <div class="form-group mt-5">
          <textarea class="form-control" v-model="articleData.content" id="content" cols="30" rows="10" placeholder="글 내용을 작성해주세요."></textarea>
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
                rating: null,
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
            this.articleData.rating = this.selectedArticle.rating
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