<template>
  <div>
	<h1>Article Detail</h1>
	<p>{{ selectedArticle.title }}</p>
	<hr>
	<p>{{ selectedArticle.content}}</p>
	<p>{{ selectedArticle.user.username }}</p>
	<p>{{ selectedArticle.movie.title }}</p>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
	name: 'ArticleDetail',
	computed: {
		...mapState('CommunityModule',['selectedArticle','comments'])
	},
	methods: {
		...mapActions('CommunityModule',['getArticleDetail'])
	},
	created() {
		this.getArticleDetail(this.$route.params.article_id)
	}
}
</script>

<style>

</style>