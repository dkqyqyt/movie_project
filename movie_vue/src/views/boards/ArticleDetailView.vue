<template>
  <div>
	<h1 class="text-center mb-5">상세 게시글</h1>
	<h1 class="ui header">{{ selectedArticle.title }}</h1>
	<div>
		<h3>작성자 : {{ selectedArticle.user.username }}</h3>
		<div class="d-flex justify-content-between">
			<span>영화 : {{ selectedArticle.movie.title }}</span>
			<span>작성일 : {{ selectedArticle.created_at }}</span>
		</div>
	</div>
	<hr>
	<div class="article-content">
		<p>{{ selectedArticle.content }}</p>
	</div>
	
	<hr>
	<button class="ui green button" @click="moveToUpdate" v-if="loginUsername === selectedArticle.user.username">수정</button>
	<button class="ui red button" @click="moveToDelete" v-if="loginUsername === selectedArticle.user.username">삭제</button>
	<div class="comments">
		<h3 class="ui dividing header">댓글</h3>
		<textarea class="comment-input" v-model="commentData.content" placeholder="타인을 배려합시다 !" id="comment" col="100" rows="3"></textarea>
		<button class="ui primary button tiny" @click="createComment(commentData)">댓글 작성</button>
		<hr>
		<div v-for="comment in comments" :key="comment.id" class="comment">
			<div class="content d-flex justify-content-between">
				<span>
					<span class="username">{{ comment.user.username }}&#9;</span>
					<span class="date">{{ comment.created_at }}</span>
				</span>
				<button v-if="loginUsername === comment.user.username" class="ui icon button negative mini" @click="deleteComment(comment.id)">X</button>
			</div>
			<div class="text">{{comment.content}}</div>
			<hr>
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
div.article-content {
	min-height: 100px;
}
textarea {
	width: 100%
}
div.comments {
	margin-top: 30px
}
span.date {
	opacity: 0.6;
	font-size: 0.8rem;
}
span.username {
	font-size: 1.2rem;
}
div.text {
	font-size: 0.9rem;
}
</style>