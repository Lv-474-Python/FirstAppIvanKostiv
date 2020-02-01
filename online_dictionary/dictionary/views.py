from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from django.http import QueryDict, HttpResponse
from .models import Category, Word, Example


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
                category=None,
            ),
            'latest_categories':
                Category.objects.order_by('id').filter(user=request.user).reverse()[:3]
        }
    )


@login_required(login_url='/sign_in/')
def category_view(request, category_id):
    category = get_object_or_404(Category, id=category_id)
    return render(
        request,
        'dictionary/category_view.html',
        {
            'categories': Category.objects.filter(
                user=request.user,
                category=None,
            ),
            'category': Category.objects.get(
                user=request.user,
                id=category.id,
            ),
        }
    )


@login_required(login_url='/sign_in/')
def word_view(request, category_id, word_id):
    if request.method == 'DELETE':
        Word.objects.filter(id=word_id).delete()
        return HttpResponse()

    else:
        category = get_object_or_404(Category, id=category_id)
        word = get_object_or_404(Word, id=word_id)

        return render(
            request,
            'dictionary/word_view.html',
            {
                'categories': Category.objects.filter(
                    user=request.user,
                    category=None,
                ),

                'category': Category.objects.get(
                    user=request.user,
                    id=category.id,
                ),

                'word': Word.objects.get(
                    category=category,
                    id=word.id,
                ),
            }
        )


@login_required(login_url='/sign_in/')
def add_new_word(request, category_id):
    if request.method == "POST":
        category = get_object_or_404(Category, id=category_id)

        new_word = Word(
            name=request.POST.get('word'),
            description=request.POST.get('description'),
            category=category
        )
        new_word.save()

        for sentence in request.POST.getlist('sentences')[:-1]:
            new_example = Example(
                sentence=sentence,
                word=new_word,
            )

            new_example.save()

        return redirect('word_view', category.id, new_word.id)

    return render(
        request,
        'dictionary/add_new_word.html',
        {
            'categories': Category.objects.filter(
                user=request.user,
                category=None
            ),

            'category': category_id,
        }
    )


@login_required(login_url='/sign_in/')
def add_new_category(request, category_id):
    if request.method == "POST":
        parent_category = get_object_or_404(Category, id=category_id)

        new_category = Category(
            user=request.user,
            name=request.POST.get('category'),
            category=parent_category
        )

        new_category.save()

        for subcategory in request.POST.getlist('subcategories')[:-1]:
            new_subcategory = Category(
                user=request.user,
                name=subcategory,
                category=new_category,
            )

            new_subcategory.save()

        return redirect('category_view', new_category.id)
    return render(
        request,
        'dictionary/add_new_category.html',
        {
            'categories': Category.objects.filter(
                user=request.user,
                category=None
            ),

            'category': category_id,
        }
    )


@login_required(login_url='/sign_in/')
def add_new_language(request):
    if request.method == "POST":

        new_language = Category(
            user=request.user,
            name=request.POST.get('category'),
            category=None
        )

        new_language.save()

        for subcategory in request.POST.getlist('subcategories')[:-1]:
            new_subcategory = Category(
                user=request.user,
                name=subcategory,
                category=new_language,
            )

            new_subcategory.save()

        return redirect('category_view', new_language.id)

    return render(
        request,
        'dictionary/add_new_category.html',
        {
            'categories': Category.objects.filter(
                user=request.user,
                category=None
            ),
        }
    )


@login_required(login_url='/sign_in/')
def delete_example(request):
    if request.method == "DELETE":
        sentence = QueryDict(request.body)
        Example.objects.filter(id=sentence.get('sentence_id')).delete()

    return HttpResponse()
