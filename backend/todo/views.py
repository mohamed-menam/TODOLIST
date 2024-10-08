from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Todo
from .serializer import TodoSerializer
from rest_framework.permissions import IsAuthenticated


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def todo_list(request):
    if request.method == 'GET':
        todos = Todo.objects.filter(user=request.user)
        serializer = TodoSerializer(
            todos, many=True, context={'request': request})
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = TodoSerializer(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def todo_detail(request, id):
    todo = get_object_or_404(Todo, pk=id, user=request.user)
    if request.method == 'GET':
        serializer = TodoSerializer(todo)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = TodoSerializer(todo, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    elif request.method == 'DELETE':
        todo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def search_todo(request):
    query = request.GET.get('title', '')
    todos = Todo.objects.filter(user=request.user)  # Filter by user

    if query:
        # Apply search within user-specific todos
        todos = todos.filter(title__icontains=query)

    serializer = TodoSerializer(todos, many=True)
    return Response(serializer.data)
