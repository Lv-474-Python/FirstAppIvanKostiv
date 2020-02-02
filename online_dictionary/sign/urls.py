from django.urls import path
from . import views

urlpatterns = [
    path("", views.sign_up, name='sign_up'),
    path("sign_in/", views.sign_in, name='sign_in'),
    path("logout/", views.logout_view, name='logout')
]
