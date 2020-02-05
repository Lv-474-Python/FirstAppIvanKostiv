from django.urls import path
from . import views

urlpatterns = [
    path('',
         views.main_page,
         name='main_page'),

    path('category/<int:category_id>/',
         views.category_view,
         name='category_view'),

    path('category/<int:category_id>/word/<int:word_id>/',
         views.word_view,
         name='word_view'),

    path('category/<int:category_id>/word/<int:word_id>/edit_word/',
         views.edit_word,
         name='edit_word'),

    path('category/<int:category_id>/add_word/',
         views.add_new_word,
         name='new_word'),

    path('category/<int:category_id>/add_category/',
         views.add_new_category,
         name='new_category'),

    path('add_language/',
         views.add_new_language,
         name='new_language'),

    path('delete_sentence/',
         views.delete_example,
         name='delete_example'),
]
