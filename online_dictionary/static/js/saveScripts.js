// function to save edited word by categoryId and wordId
function saveEditWord(categoryId, wordId) {
    let csrf_token = document.getElementsByName("csrfmiddlewaretoken")[0].value;

    let word = document.getElementsByName('word')[0];
    let description = document.getElementsByName('description')[0];
    let sentences = document.getElementsByName('sentences');

    // validate all inputs
    let validator = validateAddNewWord(word, description, sentences);

    // if data valid, then send ajax request to save edited word
    if (validator.isValid) {
        $.ajax({
            type: 'PUT',
            url: `/main_page/category/${categoryId}/word/${wordId}/`,
            data: {
                word: word.value,
                description: description.value,
                sentences: clearList(sentences)
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("X-CSRFToken", `${csrf_token}`);
            },
            success: function (response) {
                console.log(response);
                let category = response.new_category_id;
                let word = response.new_word_id;

                document.location.replace(`/main_page/category/${category}/word/${word}`)
            },
            error: function (error_message) {
                let error = JSON.parse(error_message.responseText);
                makeToast(error.error);
            }
        });
    } else {
        for (let i = 0; i < validator.error_messages.length; ++i) {
            makeToast(validator.error_messages[i])
        }
    }
}