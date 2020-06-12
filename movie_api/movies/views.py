from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated

from .serializers import MovieSerializer, MovieListSerializer
from .models import Movie

@api_view(['GET'])
def index(request):
    movies = Movie.objects.order_by('-release_date')
    serializers = MovieListSerializer(movies, many=True)
    return Response(serializers.data)

@api_view(['GET'])
def detail(request, movie_pk):
    movie = get_object_or_404(Movie, pk = movie_pk)
    serializer = MovieListSerializer(movie)
    return Response(serializer.data)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create(request):
    serializer = MovieSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data)
