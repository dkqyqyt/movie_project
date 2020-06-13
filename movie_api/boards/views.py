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
def detail(request, article_pk):
    article = get_object_or_404(Article, pk = article_pk)
    if request.method == "GET" :
        serializer = ArticleListSerializer(article)
        return Response(serializer.data)
    elif request.method == "DELETE" :
        article.delete()
        return Response({' 성공적으로 삭제되었습니다.'})
    elif request.method == "PUT" :
        serializer = ArticleSerializer(article, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

def update(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    serializer = ArticleSerializer(article)
    return Response(serializer.data)