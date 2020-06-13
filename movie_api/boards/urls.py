from django.urls import path
from . import views

app_name='boards'

urlpatterns = [
    path('', views.index),
    path('create/<int:movie_pk>/', views.create),
    # path('board_id/',views.update),
    # path('board_id/', views.delete),
]