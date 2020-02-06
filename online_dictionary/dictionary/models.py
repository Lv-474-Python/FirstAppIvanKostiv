from django.db import models, IntegrityError
from django.contrib.auth.models import User


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
        """
        Create new record of category in database
        :param name: name of category
        :param user: user of this category
        :param category: parent category (None, if this is root category)
        :return: created object Category or None, if object doesn't created
        """
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
        """
        Create new record of word in database
        :param name: name of word
        :param description: description to this word
        :param category: category in which the word is located
        :return: created object Word or None, if object doesn't created
        """
        word = Word(name=name, description=description, category=category)

        try:
            word.save()
            return word
        except IntegrityError:
            return None

    def __str__(self):
        return self.name

    def update(self, name=None, description=None, category=None):
        """
        Update created word object
        :param name: name of word
        :param description: description to this word
        :param category: category in which the word is located
        :return: updated object Word or None, if object doesn't update
        """
        if name is not None:
            self.name = name

        if description is not None:
            self.description = description

        if category is not None:
            self.category = None

        try:
            self.save()
            return self
        except IntegrityError:
            return None

    @staticmethod
    def delete_by_id(word_id):
        """
        Delete word object by his id in database
        :param word_id: example id
        :return: True if word deleted, False if example didn't delete
        """
        try:
            word = Word.objects.get(id=word_id)
        except Word.DoesNotExist:
            return False

        word.delete()
        return True


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
        """
        Create new record of example in database
        :param word: word to which the example relates
        :param sentence: example string
        :return: created object Example or None, if object doesn't update
        """
        example = Example(word=word, sentence=sentence)

        try:
            example.save()
            return example
        except IntegrityError:
            return None

    @staticmethod
    def delete_by_id(example_id):
        """
        Delete example object by his id in database
        :param example_id: example id
        :return: True if example deleted, False if example didn't delete
        """
        try:
            db_sentence = Example.objects.get(id=example_id)
        except Example.DoesNotExist:
            return False

        db_sentence.delete()
        return True

    def __str__(self):
        return self.sentence
