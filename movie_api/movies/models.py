from django.db import models
from django.conf import settings

<<<<<<< HEAD

class Movie(models.Model):
    pass
=======
class Genre(models.Model):
    name = models.CharField(max_length=50)

class Movie(models.Model):
    title = models.CharField(max_length=50)
    original_title = models.CharField(max_length=50)
    release_date = models.DateField()
    popularity = models.FloatField()
    vote_count = models.IntegerField()
    vote_average = models.FloatField()
    adult = models.BooleanField()
    overview = models.TextField()
    original_language = models.CharField(max_length=30)
    poster_path = models.CharField(max_length=150)
    backdrop_path = models.CharField(max_length=150)
    genres = models.ManyToManyField(
                Genre,
                related_name = 'movie'
            )
    like_users = models.ManyToManyField(
                    settings.AUTH_USER_MODEL,
                    related_name = 'like_movies'
                )

    
>>>>>>> master
