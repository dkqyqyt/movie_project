<template>
  <div>
      <h1>commentCreate</h1>
      {{ commentData.content }}
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'CommentCreateView',
    data() {
        return {
            commentData: this.$route.query.commentData
        }
    },
    methods: {
        ...mapActions('CommunityModule',['createComment'])
    },
    created() {
        this.createComment(this.commentData)
    }
}
</script>

<style>

</style>