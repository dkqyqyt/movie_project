<template>
  <div>
      <h1>Comment Delete</h1>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'CommentDeleteView',
    data() {
        return {
            idData: {
                articleId: this.$route.params.article_id,
                commentId: this.$route.params.comment_id
            }
        }
    },
    methods: {
        ...mapActions('CommunityModule',['deleteComment'])
    },
    created() {
        this.deleteComment(this.idData)
    }

}
</script>

<style>

</style>