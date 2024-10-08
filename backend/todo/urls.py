from django.contrib import admin
from django.urls import path
from . import views


urlpatterns = [
    path('list/', views.todo_list, name='todo_list'),
    path('<int:id>/', views.todo_detail),
    path('search/', views.search_todo),
]
