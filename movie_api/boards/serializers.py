from rest_framework import serializers
from accounts.serializers import UserSerializer
from .models import Article, Comment

class ArticleListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        field = ['id', 'title', 'user', 'created_at', 'movie']

class ArticleSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)

    class Meta:
        model = Article
        fields = "__all__"
        read_only_fields = ['id']

class CommentListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['content', 'user']

class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)

    class Meta:
        model = Comment
        fields = '__all__'