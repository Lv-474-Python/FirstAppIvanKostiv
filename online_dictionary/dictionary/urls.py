from django.urls import path, re_path
from . import views


urlpatterns = [
    path('', views.main_page, name='main_page'),
    re_path(r'(?P<category>\w+)/words/$', views.category_view, name='category_view'),
    re_path(r'(?P<category>\w+)/words/(?P<word>\w+)/definition/$', views.word_view, name='word_view'),
]
