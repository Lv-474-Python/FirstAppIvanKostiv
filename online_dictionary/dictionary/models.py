from django.db import models
from django.contrib.auth.models import User


class Category(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    category = models.ForeignKey("Category", on_delete=models.CASCADE, related_name='category_id')


class Word(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()


class Example(models.Model):
    word = models.ForeignKey(Word, on_delete=models.CASCADE)
    sentence = models.TextField()