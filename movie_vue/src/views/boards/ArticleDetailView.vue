<template>
  <div>
	<h1>Article Detail</h1>
	<p>{{ selectedArticle.title }}</p>
	<hr>
	<p>작성자 : {{ selectedArticle.user.username }}</p>
	<p>영화 : {{ selectedArticle.movie.title }}</p>
	<hr>
	<p>{{ selectedArticle.content}}</p>
	<hr>
	<p>작성일 : {{ selectedArticle.created_at }}</p>
	<p>수정일 : {{ selectedArticle.updated_at }}</p>
	<hr>
	<button @click="moveToUpdate" v-if="loginUsername === selectedArticle.user.username">수정</button>
	<button @click="moveToDelete" v-if="loginUsername === selectedArticle.user.username">삭제</button>
	<hr>
	Comments<br>
	<label for="comment"></label>
	<textarea v-model="commentData.content" id="comment" cols="100" rows="3"></textarea>
	<button>댓글 작성</button>
	<ul>
		<li v-for="comment in comments" :key="comment.id">
			{{ comment.content }}
			<button>삭제</button>
		</li>
	</ul>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
	name: 'ArticleDetailView',
	computed: {
		...mapState('CommunityModule',['selectedArticle','comments','loginUsername']),
		movieId() {
			return this.selectedArticle.movie.id
		}
	},
	data() {
		return {
			commentData: {
				content: null
			}
		}
	},
	methods: {
		...mapActions('CommunityModule',['getArticleDetail']),
		moveToUpdate() {
			this.$router.push({ name: 'ArticleCreate', params: { movie_id: this.movieId, article_id: this.$route.params.article_id}})
		},
		moveToDelete() {
			this.$router.push({ name: 'ArticleDelete', params: { article_id: this.$route.params.article_id }})
		}
	},
	created() {
		this.getArticleDetail(this.$route.params.article_id)
	}
}
</script>

<style>

</style>