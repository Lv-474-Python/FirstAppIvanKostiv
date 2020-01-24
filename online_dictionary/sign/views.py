from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from . import forms


def sign_up(request):
    if request.user.is_authenticated:
        return redirect("main_page/")
    else:
        if request.method == "POST":
            form = forms.SignUpForm(request.POST)
            if form.is_valid():
                form.save()
            else:
                return render(request, 'sign/sign_up.html', {'form': form})
            return HttpResponseRedirect("/sign_in")
        else:
            form = forms.SignUpForm()
        return render(request, "sign/sign_up.html", {'form': form})


def sign_in(request):
    if request.user.is_authenticated:
        return redirect("/main_page/")
    else:
        if request.method == "POST":
            form = forms.SignInForm(request.POST)
            if form.is_valid():
                user = form.get_user()
                print(user)
                login(request, user)
            else:
                return render(request, 'sign/sign_in.html', {'form': form})
            return redirect("/main_page/")
        else:
            form = forms.SignInForm()
        return render(request, "sign/sign_in.html", {'form': form})
