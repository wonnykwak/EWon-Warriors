from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .serializers import TodoSerializer
from .models import Todo

# Create your views here.

def say_hello (request):
    return HttpResponse("hello world")

class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()