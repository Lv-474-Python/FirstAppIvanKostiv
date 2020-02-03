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