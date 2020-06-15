from rest_framework import serializers
from accounts.serializers import UserSerializer
from movies.serializers import MovieSerializer
from .models import Article, Comment

class ArticleListSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    movie = MovieSerializer()
    created_at = serializers.DateTimeField(format="%Y년 %m월 %d일 %H:%M:%S")
    updated_at = serializers.DateTimeField(format="%Y년 %m월 %d일 %H:%M:%S") 

    class Meta:
        model = Article
        fields = '__all__'

class ArticleSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)
    movie = MovieSerializer(required=False)
    class Meta:
        model = Article
        fields = "__all__"
        read_only_fields = ['id']

class CommentListSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Comment
        fields = ['id','content', 'user']

class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)
    article = ArticleSerializer(required=False)
    
    class Meta:
        model = Comment
        fields = '__all__'