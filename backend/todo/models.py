from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings

# Create your models here.


class Todo(models.Model):
    title = models.CharField(max_length=100)
    completed = models.BooleanField(default=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)

    def __str__(self):
        return self.title
