from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.http import QueryDict, HttpResponse, JsonResponse
from .models import Category, Word, Example


@login_required()
def main_page(request):
    context = {
        'user': request.user,
        'categories': Category.objects.filter(
            user=request.user,
            category=None,
        ),
        'latest_categories':
            Category.objects.order_by('id').filter(user=request.user).reverse()[:3]
    }

    return render(
        request,
        'dictionary/main_page.html',
        context
    )


@login_required()
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

    context = {
        'categories': Category.objects.filter(
            user=request.user,
            category=None,
        ),

        'category': category
    }

    return render(
        request,
        'dictionary/category_view.html',
        context
    )


@login_required()
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


@login_required()
def add_new_word(request, category_id):
    if request.method == "POST":
        category = get_object_or_404(Category, id=category_id)

        new_word = Word.create(
            name=request.POST.get('word'),
            description=request.POST.get('description'),
            category=category
        )

        if new_word is not None:
            for sentence in request.POST.getlist('sentences[]'):
                new_example = Example.create(
                    sentence=sentence,
                    word=new_word,
                )
                if new_example is None:
                    return JsonResponse({
                        'error': f'Example {new_example} is already exist',
                    }, status=403)

            return JsonResponse({
                'new_category_id': str(new_word.category.id),
                'new_word_id': str(new_word.id)
            }, status=200)

        return JsonResponse({
            'error': f"Word {request.POST.get('word')} is already exist",
        }, status=403)

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


@login_required()
def add_new_category(request, category_id):
    if request.method == "POST":
        parent_category = get_object_or_404(Category, id=category_id)

        category_name = request.POST.get('category')

        new_category = Category.create(
            user=request.user,
            name=category_name,
            category=parent_category
        )

        if new_category is not None:
            for subcategory in request.POST.getlist('subcategories[]'):
                new_subcategory = Category.create(
                    user=request.user,
                    name=subcategory,
                    category=new_category
                )

                if new_subcategory is None:
                    return JsonResponse({
                        'error': f'Subcategory {new_subcategory} is already exist',
                    }, status=403)

            return JsonResponse({
                'new_category_id': str(new_category.id)
            }, status=200)

        return JsonResponse({
            'error': f"Category {request.POST.get('category')} is already exist",
        }, status=403)

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


@login_required()
def add_new_language(request):
    if request.method == "POST":

        new_language = Category.create(
            user=request.user,
            name=request.POST.get('category'),
            category=None
        )

        if new_language is not None:
            for subcategory in request.POST.getlist('subcategories[]'):
                new_subcategory = Category.create(
                    user=request.user,
                    name=subcategory,
                    category=new_language,
                )

                if new_subcategory is None:
                    return JsonResponse({
                        'error': f'Subcategory {new_subcategory} is already exist',
                    }, status=403)

            return JsonResponse({
                'new_category_id': str(new_language.id)}, status=200)

        return JsonResponse({
            'error': f"Category {request.POST.get('category')} is already exist",
        }, status=403)

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


@login_required()
def delete_example(request):
    if request.method == "DELETE":
        body_sentence = QueryDict(request.body)
        db_sentence = get_object_or_404(Example, id=body_sentence.get('sentence_id'))
        db_sentence.delete()

    return HttpResponse()


@login_required()
def edit_word(request, category_id, word_id):
    if request.method == "PUT":
        word = get_object_or_404(Word, id=word_id)
        data = QueryDict(request.body)

        word.update(
            name=data.get('word'),
            description=data.get('description'),
        )

        Example.objects.filter(word=word).delete()

        if word is not None:
            for example in data.getlist('sentences[]'):
                sentence = Example.create(
                    word=word,
                    sentence=example
                )

                if sentence is None:
                    return JsonResponse({
                        'error': f'Example {example} is already exist',
                    }, status=403)

            return JsonResponse({
                'new_category_id': str(word.category.id),
                'new_word_id': str(word.id)
            }, status=200)

        return JsonResponse({
            'error': f"Word {request.POST.get('word')} is already exist",
        }, status=403)

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
