from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from .models import Category, Word


@login_required(login_url='/sign_in/')
def main_page(request):
    if request.method == "POST":
        logout(request)
        return redirect("/sign_in/")

    return render(
        request,
        'dictionary/main_page.html',
        {
            'user': request.user,
            'categories': Category.objects.filter(
                user=request.user,
                category=None
            ),
            'latest_categories':
                Category.objects.order_by('id').filter(user=request.user).reverse()[:3]
        }
    )


@login_required(login_url='/sign_in/')
def category_view(request, category):
    category = get_object_or_404(Category, id=category)
    return render(
        request,
        'dictionary/category_view.html',
        {
            'categories': Category.objects.filter(
                user=request.user,
                category=None
            ),
            'category': Category.objects.get(
                user=request.user,
                id=category.id,
            ),
        }
    )


@login_required(login_url='/sign_in/')
def word_view(request, category, word):
    category = get_object_or_404(Category, id=category)
    word = get_object_or_404(Word, id=word)

    return render(
        request,
        'dictionary/word_view.html',
        {
            'categories': Category.objects.filter(
                user=request.user,
                category=None
            ),

            'category': Category.objects.get(
                user=request.user,
                id=category.id
            ),

            'word': Word.objects.get(
                category=category,
                id=word.id,
            ),
        }
    )
