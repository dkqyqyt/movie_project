from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from .serializers import MovieSerializer, MovieListSerializer, GenreSerializer
from .models import Movie, Genre

import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer

import pandas as pd
from django_pandas.io import read_frame
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer

def recommendations(title):
    df = read_frame(Movie.objects.all())
    df = df[['title', 'overview','id']]

    count = CountVectorizer()
    count_matrix = count.fit_transform(df['overview'])

    cosine_sim = cosine_similarity(count_matrix, count_matrix)

    indices = pd.Series(df.title)
    recommended_movies  = []

    idx = indices[indices == title].index[0]

    score_series = pd.Series(cosine_sim[idx]).sort_values(ascending=True)

    top_10_indexes = list(score_series.iloc[1:13].index)
    for i in top_10_indexes:
        recommended_movies.append(list(df.id)[i])

    return recommended_movies

@api_view(['GET'])
def index(request):
    movies = Movie.objects.order_by('-vote_average')
    serializers = MovieListSerializer(movies, many=True)
    return Response(serializers.data)

@api_view(['GET','PUT','DELETE'])
def detail(request, movie_pk):
    print(request.user)
    movie = get_object_or_404(Movie, pk = movie_pk)
    if request.method == 'GET':
        serializer = MovieListSerializer(movie)
        return Response(serializer.data)
    if request.method == 'DELETE':
        if not request.user.is_superuser:
            return Response({'삭제할 권한이 없습니다.'})
        movie.delete()
        return Response({'성공적으로 삭제되었습니다.'})
    if request.method == 'PUT':
        if not request.user.is_superuser:
            return Response({'수정할 권한이 없습니다.'})
        genres = Genre.objects.all()
        print(request.data)
        for i in range(len(request.data['genres'])):
            for genre in genres:
                if genre.name == request.data['genres'][i]:
                    request.data['genres'][i] = genre.id
        serializer = MovieSerializer(movie ,data=request.data) 
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        

@api_view(['POST'])
@permission_classes([IsAdminUser])
def create(request):
    print(request.user)
    genres = Genre.objects.all()
    print(request.data)
    for i in range(len(request.data['genres'])):
        for genre in genres:
            if genre.name == request.data['genres'][i]:
                request.data['genres'][i] = genre.id
    
    serializer = MovieSerializer(data=request.data)
    
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def update(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    serializer = MovieListSerializer(movie)
    return Response(serializer.data)

@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def recommend(request, movie_pk):
    movie = get_object_or_404(Movie,pk = movie_pk)
    print(movie)
    movies_pk = recommendations(movie.title)
    print(movies_pk)
    movies = []

    for moviePk in movies_pk:
        selected_movie = get_object_or_404(Movie, pk=moviePk)
        movies.append(selected_movie)

    serializers = MovieListSerializer(movies, many=True)
    return Response(serializers.data)


