from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from .serializers import MovieSerializer, MovieListSerializer, GenreSerializer
from .models import Movie, Genre

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
        # if not request.user.is_superuser:
        #     return Response({'삭제할 권한이 없습니다.'})
        movie.delete()
        return Response({'성공적으로 삭제되었습니다.'})
    if request.method == 'PUT':
        # if not request.user.is_superuser:
        #     return Response({'수정할 권한이 없습니다.'})
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
# @permission_classes([IsAdminUser])
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
def update(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    serializer = MovieListSerializer(movie)
    return Response(serializer.data)