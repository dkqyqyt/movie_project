<template>
  <div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'ArticleDeleteView',
    methods: {
        ...mapActions('CommunityModule',['deleteArticle'])
    },
    created() {
        this.deleteArticle(this.$route.params.article_id)
    }
}
</script>

<style>

</style>