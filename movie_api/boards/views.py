from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_POST
from django.contrib.auth.decorators import login_required

from rest_framework.response import Response
from rest_framework.decorators import api_view

<<<<<<< HEAD
# from .serializers import ArticleSerializer


=======
>>>>>>> master
def create(request):
    pass