<template>
  <div>
	<h1 class="text-center">상세 게시글</h1>
	<p>작성자 : {{ selectedArticle.user.username }}</p>
	<p>영화 : {{ selectedArticle.movie.title }}</p>
	<hr>
	<!-- <h1 class="ui header">{{ selectedArticle.title }}</h1> -->
	<div class="ui segment">
		<h1 class="ui left floated header">{{ selectedArticle.title }}</h1>
		<!-- <p class="ui right aligned segment">작성자 : {{ selectedArticle.user.username }}</p>
		<p class="ui right aligned segment">영화 : {{ selectedArticle.movie.title }}</p> -->
		<div class="ui clearing divider"></div>
	<p>{{ selectedArticle.content }}</p>
	</div>
	<!-- <hr>
	<p>{{ selectedArticle.content}}</p> -->
	<hr>
	<p>작성일 : {{ selectedArticle.created_at }}</p>
	<p>수정일 : {{ selectedArticle.updated_at }}</p>
	<hr>
	<button class="ui green button" @click="moveToUpdate" v-if="loginUsername === selectedArticle.user.username">수정</button>
	<button class="ui red button" @click="moveToDelete" v-if="loginUsername === selectedArticle.user.username">삭제</button>
	<!-- <hr> -->
	<!-- Comments<br>
	<label for="comment"></label>
	<textarea v-model="commentData.content" id="comment" cols="100" rows="3"></textarea>
	<button @click="createComment(commentData)">댓글 작성</button>
	<ul>
		<li v-for="comment in comments" :key="comment.id">
			{{ comment.content }}
			<button @click="deleteComment(comment.id)">삭제</button>
		</li>
	</ul> -->
	<div class="ui comments">
		<h3 class="ui dividing header">댓글</h3>
		<textarea v-model="commentData.content" placeholder="타인을 배려합시다 !" id="comment" cols="100" rows="3"></textarea>
		<button class="ui primary button tiny" @click="createComment(commentData)">댓글 작성</button>

		<div v-for="comment in comments" :key="comment.id" class="comment">
			<a class="avatar">
			</a>
			<div class="content">
			<a class="author">{{ comment.user.username }}</a>
			<div class="metadata">
				<span class="date">{{ comment.created_at }}</span>
				<button class="ui icon button negative mini" @click="deleteComment(comment.id)">X</button>
			</div>
			<div class="text">
				{{comment.content}}
			</div>
			</div>
		</div>
		
	</div>
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
		},
		articleId() {
			return this.$route.params.article_id
		},
	},
	data() {
		return {
			commentData: {
				content: null,
				articleId: this.$route.params.article_id
			},
		}
	},
	methods: {
		...mapActions('CommunityModule',['getArticleDetail']),
		moveToUpdate() {
			this.$router.push({ name: 'ArticleCreate', params: { movie_id: this.movieId, article_id: this.articleId}})
		},
		moveToDelete() {
			this.$router.push({ name: 'ArticleDelete', params: { article_id: this.articleId }})
		},
		createComment() {
			this.$router.push({ name: 'CommentCreate', params: { article_id: this.articleId }, query: { commentData: this.commentData }})
		},
		deleteComment(commentId) {
			this.$router.push({ name: 'CommentDelete', params: { article_id: this.articleId, comment_id: commentId}})
		}
	},
	created() {
		this.getArticleDetail(this.articleId)
	}
}
</script>

<style scoped>

</style>