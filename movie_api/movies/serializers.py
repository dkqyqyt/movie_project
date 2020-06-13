from rest_framework import serializers
from accounts.serializers import UserSerializer
from .models import Movie, Genre

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'

class MovieListSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(many=True)
    class Meta:
        model = Movie
        fields = '__all__'

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = [
            'id',
            'title',
            'original_title',
            'release_date',
            'popularity',
            'vote_count',
            'vote_average',
            'adult',
            'overview',
            'original_language',
            'poster_path',
            'backdrop_path',
            'genres'
            ]