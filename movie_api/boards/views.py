from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from movies.models import Movie
from .models import Article, Comment
from .serializers import ArticleSerializer, ArticleListSerializer, CommentSerializer, CommentListSerializer

@api_view(['GET'])
def index(request):
    articles = Article.objects.all()
    comments = Comment.objects.all()

    article_serializers = ArticleListSerializer(articles, many=True)
    comment_serializers = CommentListSerializer(comments, many=True)

    return Response((article_serializers.data, comment_serializers.data))

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create(request,movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    serializer = ArticleSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user, movie= movie)
        return Response(serializer.data)