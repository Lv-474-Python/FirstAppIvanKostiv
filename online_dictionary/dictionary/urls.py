from django.urls import path
from . import views

urlpatterns = [
    path('',
         views.main_page,
         name='main_page'),

    path('<int:category>/',
         views.category_view,
         name='category_view'),

    path('<int:category>/<int:word>/',
         views.word_view,
         name='word_view'),
]
