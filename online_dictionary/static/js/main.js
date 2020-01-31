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
                .parent().clone().children('.sentence_input')
                .val("")
                .attr('id', 'last_sentence')
                .attr('onblur', 'addNewSentenceInput(this)')
                .parent().addClass('mt-1')
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