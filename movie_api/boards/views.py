from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .models import Article, Comment
from .serializers import ArticleSerializer, ArticleListSerializer, CommentSerializer, CommentListSerializer
def index(request):
    articles = Article.objects.all()
    comments = Comment.objects.all()

    article_serializers = ArticleListSerializer(articles, many=True)
    comment_serializers = CommentListSerializer(comments, many=True)


# def create(request):
#     pass