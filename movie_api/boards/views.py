from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model


from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from movies.models import Movie
from .models import Article, Comment
from .serializers import ArticleSerializer, ArticleListSerializer, CommentSerializer, CommentListSerializer

# 전체 게시글 보기 
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def index(request):
    articles = Article.objects.all()
    article_serializers = ArticleListSerializer(articles, many=True)
    return Response(article_serializers.data)

# 특정 영화에 대한 게시글 작성 
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create(request,movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    serializer = ArticleSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user, movie= movie)
        return Response(serializer.data)


# 특정영화관련 전체 게시글 보기
@api_view(['GET'])
def boards_movies(request, movie_pk):
    articles = Article.objects.filter(movie = movie_pk)
    article_serializer = ArticleListSerializer(articles, many=True)
    
    return Response(article_serializer.data)
    
    
# 전체게시글 R D U
@api_view(['GET', 'DELETE', 'PUT'])
@permission_classes([IsAuthenticated])
def detail(request, article_pk):
    article = get_object_or_404(Article, pk = article_pk)
    if request.method == "GET" :
        comments = Comment.objects.filter(article = article_pk)
        article_serializer = ArticleListSerializer(article)
        comment_serializer = CommentListSerializer(comments, many=True)
        return Response((article_serializer.data, comment_serializer.data))
    elif request.method == "DELETE" :
        if not request.user == article.user:
            return Response({' 삭제할 권한이 없습니다. '})
        article.delete()
        return Response({' 성공적으로 삭제되었습니다.'})
    elif request.method == "PUT" :
        if not request.user == article.user:
            return Response({ '수정할 권한이 없습니다. '})
        serializer = ArticleSerializer(article, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

def update(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    serializer = ArticleSerializer(article)
    return Response(serializer.data)

# article 에 대한 comment 작성
@api_view(['POST'])
def comment_create(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user, article=article)
        return Response(serializer.data)
    return Response(serializer.data)

# article에 대한 comment 삭제
@api_view(['DELETE'])
def comment_delete(request, comment_pk, article_pk):
    comment = get_object_or_404(Comment, pk = comment_pk)
    if request.user == comment.user :
        comment.delete()
        return Response({' 해당 댓글이 성공적으로 삭제되었습니다.'})
    else :
        return Response({'작성자만 삭제가능합니다.'})