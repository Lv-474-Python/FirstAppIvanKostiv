from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout


@login_required(login_url='/sign_in/')
def main_page(request):
    if request.method == "POST":
        logout(request)
        return redirect("/sign_in/")
    return render(request, 'dictionary/main_page.html')