from django.db import models
from django.contrib.auth.models import User


class Category(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    category = models.ForeignKey("Category",
                                 blank=True,
                                 null=True,
                                 on_delete=models.CASCADE,
                                 related_name='categories')

    def __str__(self):
        return self.name


class Word(models.Model):
    category = models.ForeignKey(Category,
                                 on_delete=models.CASCADE,
                                 related_name='words')

    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name


class Example(models.Model):
    word = models.ForeignKey(Word,
                             on_delete=models.CASCADE,
                             related_name='sentences')

    sentence = models.TextField()

    def __str__(self):
        return self.sentence
