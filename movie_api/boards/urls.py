from django.urls import path
from . import views

app_name='boards'

urlpatterns = [
    path('create/', views.create),
    # path('/', views.read),
    # path('board_id/',views.update),
    # path('board_id/', views.delete),
]