from django.db import models, IntegrityError
from django.contrib.auth.models import User


# TODO create save method
# TODO create update method
# TODO create delete method

class Category(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    category = models.ForeignKey("Category",
                                 blank=True,
                                 null=True,
                                 on_delete=models.CASCADE,
                                 related_name='categories')

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['name', 'category'], name='uc_category_name')
        ]

    @staticmethod
    def create(name, user, category):
        category = Category(name=name, user=user, category=category)
        try:
            category.save()
            return category
        except IntegrityError:
            return None

    def __str__(self):
        return self.name


class Word(models.Model):
    category = models.ForeignKey(Category,
                                 on_delete=models.CASCADE,
                                 related_name='words')

    name = models.CharField(max_length=50)
    description = models.TextField()

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['name', 'category'], name="uc_name_category"),
        ]

    @staticmethod
    def create(name, description, category):
        word = Word(name=name, description=description, category=category)

        try:
            word.save()
            return word
        except IntegrityError:
            return None

    def __str__(self):
        return self.name


class Example(models.Model):
    word = models.ForeignKey(Word,
                             on_delete=models.CASCADE,
                             related_name='sentences')

    sentence = models.TextField()

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['sentence', 'word'], name='uc_word_sentence')
        ]

    @staticmethod
    def create(word, sentence):
        example = Example(word=word, sentence=sentence)

        try:
            example.save()
            return example
        except IntegrityError:
            return None

    def __str__(self):
        return self.sentence
