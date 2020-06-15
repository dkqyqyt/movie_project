<template>
  <div>
	<h1 class="text-center">Article Detail</h1>
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
	<button @click="createComment(commentData)">댓글 작성</button>
	<ul>
		<li v-for="comment in comments" :key="comment.id">
			{{ comment.content }}
			<button @click="deleteComment(comment.id)">삭제</button>
		</li>
	</ul>
	<div class="ui comments">
		<h3 class="ui dividing header">Comments</h3>
		<textarea v-model="commentData.content" id="comment" cols="100" rows="3"></textarea>
		<button class="ui primary button" @click="createComment(commentData)">댓글 작성</button>
		<div v-for="comment in comments" :key="comment.id" class="comment">
			<a class="avatar">
			</a>
			<div class="content">
			<a class="author">{{ comment.user.username }}</a>
			<div class="metadata">
				<span class="date">{{ comment.created_at }}</span>
			</div>
			<div class="text">
				How artistic!
			</div>
			<div class="actions">
				<a class="reply">Reply</a>
			</div>
			</div>
		</div>
		<div class="comment">
			<a class="avatar">
			<img src="/images/avatar/small/elliot.jpg">
			</a>
			<div class="content">
			<a class="author">Elliot Fu</a>
			<div class="metadata">
				<span class="date">Yesterday at 12:30AM</span>
			</div>
			<div class="text">
				<p>This has been very useful for my research. Thanks as well!</p>
			</div>
			<div class="actions">
				<a class="reply">Reply</a>
			</div>
			</div>
			<div class="comments">
			<div class="comment">
				<a class="avatar">
				<img src="/images/avatar/small/jenny.jpg">
				</a>
				<div class="content">
				<a class="author">Jenny Hess</a>
				<div class="metadata">
					<span class="date">Just now</span>
				</div>
				<div class="text">
					Elliot you are always so right :)
				</div>
				<div class="actions">
					<a class="reply">Reply</a>
				</div>
				</div>
			</div>
			</div>
		</div>
		<div class="comment">
			<a class="avatar">
			<img src="/images/avatar/small/joe.jpg">
			</a>
			<div class="content">
			<a class="author">Joe Henderson</a>
			<div class="metadata">
				<span class="date">5 days ago</span>
			</div>
			<div class="text">
				Dude, this is awesome. Thanks so much
			</div>
			<div class="actions">
				<a class="reply">Reply</a>
			</div>
			</div>
		</div>
		<form class="ui reply form">
			<div class="field">
			<textarea></textarea>
			</div>
			<div class="ui blue labeled submit icon button">
			<i class="icon edit"></i> Add Reply
			</div>
		</form>
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
		}
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
			this.$router.push({ name: 'ArticleCreate', params: { movie_id: this.movieId, article_id: this.$route.params.article_id}})
		},
		moveToDelete() {
			this.$router.push({ name: 'ArticleDelete', params: { article_id: this.$route.params.article_id }})
		},
		createComment() {
			this.$router.push({ name: 'CommentCreate', params: { article_id: this.$route.params.article_id }, query: { commentData: this.commentData }})
		},
		deleteComment(commentId) {
			console.log(commentId)
			this.$router.push({ name: 'CommentDelete', params: { article_id: this.$route.params.article_id, comment_id: commentId}})
		}
	},
	created() {
		this.getArticleDetail(this.$route.params.article_id)
	}
}
</script>

<style>

</style>