function addNewCategory() {
    let csrf_token = document.getElementsByName("csrfmiddlewaretoken")[0].value;

    let category = document.getElementsByName('category')[0];
    let subcategories = document.getElementsByName('subcategories');

    let validator = validateAddNewCategory(category, subcategories);

    if (validator.isValid) {
        $.ajax({
            type: "POST",
            url: document.location.href,
            data: {
                category: category.value,
                subcategories: clearList(subcategories),
            },

            beforeSend: function (xhr) {
                xhr.setRequestHeader("X-CSRFToken", `${csrf_token}`);
            },
            success: function (response) {
                document.location.replace(`/main_page/${response.new_category_id}/`)
            },
            error: function (error_message) {
                let error = JSON.parse(error_message.responseText);

                makeToast(error.error);
            }
        })
    } else {
        for (let i = 0; i < validator.error_messages.length; ++i) {
            makeToast(validator.error_messages[i])
        }
    }
}

function addNewWord() {
    let csrf_token = document.getElementsByName("csrfmiddlewaretoken")[0].value;

    let word = document.getElementsByName('word')[0];
    let description = document.getElementsByName('description')[0];
    let examples = document.getElementsByName('sentences');

    let validator = validateAddNewWord(word, description, examples);

    if (validator.isValid) {
        $.ajax({
            type: "POST",
            url: document.location.href,
            data: {
                word: word.value,
                description: description.value,
                examples: clearList(examples),
            },

            beforeSend: function (xhr) {
                xhr.setRequestHeader("X-CSRFToken", `${csrf_token}`);
            },
            success: function (response) {
                let category = response.new_category_id;
                let word = response.new_word_id;

                document.location.replace(`/main_page/${category}/${word}`)
            },
            error: function (error_message) {
                console.log(error_message);
                let error = JSON.parse(error_message.responseText);

                makeToast(error.error);
            }
        })
    } else {

        for (let i = 0; i < validator.error_messages.length; ++i) {
            makeToast(validator.error_messages[i])
        }
    }
}