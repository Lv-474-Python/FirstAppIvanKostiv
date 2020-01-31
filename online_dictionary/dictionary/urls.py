from django.urls import path
from . import views

urlpatterns = [
    path('',
         views.main_page,
         name='main_page'),

    path('<int:category_id>/',
         views.category_view,
         name='category_view'),

    path('<int:category_id>/<int:word_id>/',
         views.word_view,
         name='word_view'),

    path('<int:category_id>/add_word/',
         views.add_new_word,
         name='new_word')
]
