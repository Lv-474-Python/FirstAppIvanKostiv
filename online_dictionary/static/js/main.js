function collapsible(element) {
    if (element.getAttribute('aria-expanded') === 'true') {
        collapse(element, element.getAttribute('data-target'));
    } else {
        expand(element, element.getAttribute('data-target'));
    }
}

function expand(icon, element) {
    icon.setAttribute('transform', 'rotate(90)');
    $(element).expand();
}

function collapse(icon, element) {
    icon.setAttribute('transform', 'rotate(0)');
    $(element).collapse();
}

function addNewSentenceInput(sentence_input) {
    if (sentence_input.value !== '') {
        if (sentence_input.getAttribute('id') === 'last_sentence') {
            $('#last_sentence')
                .removeAttr('id')
                .parent().parent().clone().children('.sentence-wrapper').children('.sentence_input')
                .val("")
                .attr('id', 'last_sentence')
                .attr('onblur', 'addNewSentenceInput(this)')
                .parent().parent()
                .appendTo("#word-form-inputs")
        }
    } else {
        if (sentence_input.getAttribute('id') !== 'last_sentence') {
            // empty not last sentence input
            sentence_input.parentNode.parentNode.removeChild(sentence_input.parentNode);
            // input > div > form.delete(div)
        }
    }
}

function addNewSubcategoryInput(subcategory_input) {
    if (subcategory_input.value !== '') {
        if (subcategory_input.getAttribute('id') === 'last_subcategory') {
            $('#last_subcategory')
                .removeAttr('id')
                .parent().clone().children('.subcategory_input')
                .val("")
                .attr('id', 'last_subcategory')
                .attr('onblur', 'addNewSubcategoryInput(this)')
                .parent().addClass('mt-1')
                .appendTo("#category-form-inputs")
        }
    } else {
        if (subcategory_input.getAttribute('id') !== 'last_subcategory') {
            // empty not last sentence input
            subcategory_input.parentNode.parentNode.removeChild(subcategory_input.parentNode);
            // input > div > form.delete(div)
        }
    }
}

function saveEditWord(categoryId, wordId) {
    let csrf_token = document.getElementsByName("csrfmiddlewaretoken")[0].value;

    let sentences = [];
    document.getElementsByName('sentences').forEach(element => sentences.push(element.value));

    $.ajax({
        type: 'PUT',
        url: `/main_page/${categoryId}/${wordId}/edit_word/`,
        data: {
            word: document.getElementsByName('word')[0].value,
            description: document.getElementsByName('description')[0].value,
            sentences: sentences
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("X-CSRFToken", `${csrf_token}`);
        },

        success: function () {
            document.location.replace(`/main_page/${categoryId}/${wordId}/`)
        },
        error: function () {
            alert("Not cool")
        }
    });
}