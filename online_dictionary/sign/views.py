from django.http import HttpResponseRedirect
from django.shortcuts import render
from . import forms
from django.contrib.auth.models import User


def sign_up(request):
    if request.method == "POST":
        form = forms.SignUpForm(request.POST)
        if form.is_valid():
            username, email, password, confirm = form.cleaned_data.values()
            user = User(username=username, email=email, password=password)
            user.save()

        return HttpResponseRedirect("/sign_in")
    else:
        form = forms.SignUpForm()

    return render(request, "sign/sign_up.html", {'form': form})


def sign_in(request):
    return render(request, "sign/sign_in.html")
