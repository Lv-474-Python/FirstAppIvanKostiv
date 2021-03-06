from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.http import QueryDict, HttpResponse, JsonResponse
from .models import Category, Word, Example


@login_required()
def main_page(request):
    """
    View for main page
    :param request:
    :return:
    """
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
    """
    View for category page
    If method DELETE then delete this category with id=category_id
    :param request:
    :param category_id: category id to delete or get
    """
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
    """
    View for word page.
    If method DELETE then delete this word from database
    If method PUT then update this word with examples in which:
        name = PUT['word']
        description = PUT['description']

        examples = PUT['sentences[]']
    If another method then render page with word view.

    :param request:
    :param category_id: category id in which word contains
    :param word_id: word id to update, delete or get
    """
    if request.method == 'DELETE':
        if Word.delete_by_id(word_id):
            return HttpResponse()
        else:
            return JsonResponse({
                'error': f'Error while deleting this word',
            }, status=422)

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
                    # Sentence already exist in database
                    return JsonResponse({
                        'error': f'Example {example} is already exist',
                    }, status=422)

            # Success updated word with examples
            return JsonResponse({
                'new_category_id': str(word.category.id),
                'new_word_id': str(word.id)
            }, status=200)

        # Word already exist in database
        return JsonResponse({
            'error': f"Word {request.POST.get('word')} is already exist",
        }, status=422)

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
    """
    View for add new word.
    If method POST then created new word with examples in which:
        name = POST['word']
        description = POST['description']
        category = category_id

        examples = POST['sentences[]']

    If another method then return rendered add_new_word page

    :param request
    :param category_id: category in which to add new word
    """
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
                    # Example already exist in database
                    return JsonResponse({
                        'error': f'Example {new_example} is already exist',
                    }, status=422)

            # Success added word with examples
            return JsonResponse({
                'new_category_id': str(new_word.category.id),
                'new_word_id': str(new_word.id)
            }, status=200)

        # Word already exist in database
        return JsonResponse({
            'error': f"Word {request.POST.get('word')} is already exist",
        }, status=422)

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
    """
    View for add new category.
    If method POST, then create new category with subcategory in which:
        user=request.user
        name=POST['category']
        category=category_id

        subcategory = POST['subcategories[]']

    If another method then return rendered page to add new category.
    :param request:
    :param category_id: category id to which you want to add a new category
    """
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
                    # Subcategory already exist in database
                    return JsonResponse({
                        'error': f'Subcategory {new_subcategory} is already exist',
                    }, status=422)

            # Success added category with subcategory
            return JsonResponse({
                'new_category_id': str(new_category.id)
            }, status=200)

        # Category already exist in database
        return JsonResponse({
            'error': f"Category {request.POST.get('category')} is already exist",
        }, status=422)

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
    """
        View for add new language.
        If method POST, then create new category with subcategory in which:
            user=request.user
            name=POST['category']
            category=None

            subcategory = POST['subcategories[]']

        If another method then return rendered page to add new category.
        :param request:
        """
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
                    # Subcategory already exist in database
                    return JsonResponse({
                        'error': f'Subcategory {new_subcategory} is already exist',
                    }, status=422)

            # Success created category with subcategory
            return JsonResponse({
                'new_category_id': str(new_language.id)}, status=200)

        # Category already exist in database
        return JsonResponse({
            'error': f"Category {request.POST.get('category')} is already exist",
        }, status=422)

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
def edit_word(request, category_id, word_id):
    """
    View for edit word page.
    :param request:
    :param category_id: category id in which the word is located
    :param word_id: word in to edit
    :return: rendered page for edit word
    """
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


@login_required()
def delete_example(request):
    """
    View for delete example from database.
    If method DELETE with param 'sentence_id', then delete sentence from database
        with id=sentence_id
    """
    if request.method == "DELETE":
        body_sentence = QueryDict(request.body)
        if Example.delete_by_id(body_sentence.get('sentence_id')):
            return HttpResponse()
        else:
            return JsonResponse({
                'error': f'Error while deleting this sentence',
            }, status=422)
    return HttpResponse()
