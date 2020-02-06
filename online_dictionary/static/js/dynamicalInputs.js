function deleteSentenceInput(sentence_input) {
    // if sentence is empty
    if (sentence_input.value === '') {
        // and this is not last sentence, then delete this input
        if (sentence_input.getAttribute('id') !== 'last_sentence') {
            // input > div > div > form.delete(div)
            sentence_input.parentNode.parentNode.parentNode.removeChild(sentence_input.parentNode.parentNode);
        }
    }
}


function addNewSentenceInput(sentence_input) {
    // if this is last sentence then add new input for new sentence
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
    // if this is last subcategory then add new input for new subcategory
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
    // if input is empty
    if (subcategory.value === '') {
        // and this is not the last input for subcategory then delete them
        if (subcategory.getAttribute('id') !== 'last_subcategory') {
             // input > div > form.delete(div)
            subcategory.parentNode.parentNode.removeChild(subcategory.parentNode);
        }
    }
}