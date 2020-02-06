from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth import login, logout
from . import forms


def sign_up(request):
    """
    View for sign up page. If user authenticated, then redirect to main page.
    Validate sign up form and create new user in database.
    """
    if request.user.is_authenticated:
        return redirect("main_page")

    form = forms.SignUpForm()
    if request.method == "POST":
        form = forms.SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('sign_in')

    context = {
        'form': form
    }

    return render(request,
                  "sign/sign_up.html",
                  context)


def sign_in(request):
    """
    View for sign in page. If user authenticated, then redirect to main page.
    Validate sign in form and login user.
    """
    if request.user.is_authenticated:
        return redirect("main_page")

    form = forms.SignInForm()
    if request.method == "POST":
        form = forms.SignInForm(request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect("main_page")

    context = {
        'form': form
    }

    return render(request,
                  "sign/sign_in.html",
                  context)


def logout_view(request):
    """
    View for log out. Logout user.
    """
    logout(request)
    return HttpResponse()
