from django.urls import path
from . import views

app_name='boards'

urlpatterns = [
    path('', views.index, name="index"),
    path('create/<int:movie_pk>/', views.create, name="create"),
    path('movies/<int:movie_pk>/', views.boards_movies, name="boards_movies"), #특정 movie에 대한 모든 게시글
    path('<int:article_pk>/', views.detail), # 전체 게시글 RUD
    path('<int:article_pk>/comments/create/', views.comment_create, name="comment_create"),
    path('<int:article_pk>/comments/delete/<int:comment_pk>/', views.comment_delete, name="comment_delete"),
]