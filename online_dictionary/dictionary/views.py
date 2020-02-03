from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.http import QueryDict, HttpResponse, JsonResponse
from .models import Category, Word, Example


@login_required(login_url='/sign_in/')
def main_page(request):
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
    if request.method == "DELETE":
        category = Category.objects.get(id=category_id)
        if category.category is not None:
            data = {'parent_id': category.category.id}
        else:
            data = {'parent_id': None}

        category.delete()
        return JsonResponse(data)

    category = get_object_or_404(Category, id=category_id)
    return render(
        request,
        'dictionary/category_view.html',
        {
            'categories': Category.objects.filter(
                user=request.user,
                category=None,
            ),

            'category': category
        }
    )


@login_required(login_url='/sign_in/')
def word_view(request, category_id, word_id):
    if request.method == 'DELETE':
        word = get_object_or_404(Word, id=word_id)
        word.delete()
        return HttpResponse()

    word = get_object_or_404(Word, id=word_id)

    context = {
        'categories': Category.objects.filter(
            user=request.user,
            category=None,
        ),
        'category': word.category,
        'word': word,
    }

    return render(
        request,
        'dictionary/word_view.html',
        context
    )


@login_required(login_url='/sign_in/')
def add_new_word(request, category_id):
    if request.method == "POST":
        category = get_object_or_404(Category, id=category_id)

        # TODO integrity error
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

    context = {
        'categories': Category.objects.filter(
            user=request.user,
            category=None
        ),

        'category': category_id,
    }

    return render(
        request,
        'dictionary/add_new_word.html',
        context
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
        # TODO integrity error
        new_category.save()

        for subcategory in request.POST.getlist('subcategories')[:-1]:
            new_subcategory = Category(
                user=request.user,
                name=subcategory,
                category=new_category,
            )

            new_subcategory.save()

        return HttpResponse()

    context = {
        'categories': Category.objects.filter(
            user=request.user,
            category=None
        ),
        'category': category_id,
    }

    return render(
        request,
        'dictionary/add_new_category.html',
        context
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

    context = {
        'categories': Category.objects.filter(
            user=request.user,
            category=None
        ),
    }

    return render(
        request,
        'dictionary/add_new_category.html',
        context
    )


@login_required(login_url='/sign_in/')
def delete_example(request):
    if request.method == "DELETE":
        body_sentence = QueryDict(request.body)
        db_sentence = get_object_or_404(Example, id=body_sentence.get('sentence_id'))
        db_sentence.delete()

    return HttpResponse()


@login_required(login_url='/sign_in/')
def edit_word(request, category_id, word_id):
    if request.method == "PUT":
        word = get_object_or_404(Word, id=word_id)

        data = QueryDict(request.body)

        word.name = data.get('word')
        word.description = data.get('description')

        # TODO Integrity error
        word.save()

        Example.objects.filter(word=word).delete()

        for example in data.getlist('sentences[]')[:-1]:
            sentence = Example(word=word,
                               sentence=example)
            # TODO Integrity Error
            sentence.save()

        return HttpResponse()

    word = get_object_or_404(Word, id=word_id)

    context = {
        'categories': Category.objects.filter(
            user=request.user,
            category=None
        ),
        'category': word.category,
        'word': word,
    }

    return render(
        request,
        'dictionary/edit_word.html',
        context
    )
