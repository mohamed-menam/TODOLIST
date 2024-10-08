from django.contrib import admin
from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView
from .serializer import MyTokenObtainPairView


urlpatterns = [
    path('api/token/', MyTokenObtainPairView.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view()),
    path('register/', views.register_user),
    path('login/', views.login_view),

]
