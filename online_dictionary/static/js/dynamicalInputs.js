function deleteSentenceInput(sentence_input) {
    if (sentence_input.value === '') {
        if (sentence_input.getAttribute('id') !== 'last_sentence') {
            // empty not last sentence input
            sentence_input.parentNode.parentNode.parentNode.removeChild(sentence_input.parentNode.parentNode);
            // input > div > form.delete(div)
        }
    }
}

function addNewSentenceInput(sentence_input) {
    console.log("focus")
    if (sentence_input.getAttribute('id') === 'last_sentence') {
        $('#last_sentence')
            .removeAttr('id')
            .parent().parent().clone().children('.sentence-wrapper').children('.sentence_input')
            .val("")
            .attr('id', 'last_sentence')
            .attr('onfocus', 'addNewSentenceInput(this)')
            .parent().parent()
            .appendTo("#word-form-inputs")
    }
}

function addNewSubcategoryInput(subcategory_input) {
    if (subcategory_input.getAttribute('id') === 'last_subcategory') {
        $('#last_subcategory')
            .removeAttr('id')
            .parent().clone().children('.subcategory_input')
            .val("")
            .attr('id', 'last_subcategory')
            .attr('onfocus', 'addNewSubcategoryInput(this)')
            .parent().addClass('mt-1')
            .appendTo("#category-form-inputs")
    }
}

function deleteSubcategoryInput(subcategory) {
    if (subcategory.value === '') {
        if (subcategory.getAttribute('id') !== 'last_subcategory') {
            // empty not last sentence input
            subcategory.parentNode.parentNode.removeChild(subcategory.parentNode);
            // input > div > form.delete(div)
        }
    }
}