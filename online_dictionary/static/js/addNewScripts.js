// function to add new category in database
function addNewCategory() {
    let csrf_token = document.getElementsByName("csrfmiddlewaretoken")[0].value;

    let category = document.getElementsByName('category')[0];
    let subcategories = document.getElementsByName('subcategories');

    // validate all inputs
    let validator = validateAddNewCategory(category, subcategories);

    // if data is valid, then send ajax request to add new category
    if (validator.isValid) {
        $.ajax({
            type: "POST",
            url: document.location.href,
            data: {
                category: category.value, // name of category
                subcategories: clearList(subcategories), // subcategory name list
            },

            // send сsrf-token
            beforeSend: function (xhr) {
                xhr.setRequestHeader("X-CSRFToken", `${csrf_token}`);
            },
            // if success then redirect to new category page
            success: function (response) {
                let category = response.new_category_id;
                document.location.replace(`/main_page/category/${category}/`)
            },
            // if error then make toast with error message
            error: function (error_message) {
                let error = JSON.parse(error_message.responseText);
                makeToast(error.error);
            }
        })
    } else {
        // if data is not valid then make toast with all of this error
        for (let i = 0; i < validator.error_messages.length; ++i) {
            makeToast(validator.error_messages[i])
        }
    }
}

// function to add new word in database
function addNewWord() {
    let csrf_token = document.getElementsByName("csrfmiddlewaretoken")[0].value;

    let word = document.getElementsByName('word')[0];
    let description = document.getElementsByName('description')[0];
    let examples = document.getElementsByName('sentences');

    // validate all inputs
    let validator = validateAddNewWord(word, description, examples);

    // if data is valid then create ajax request to add new word
    if (validator.isValid) {
        $.ajax({
            type: "POST",
            url: document.location.href,
            data: {
                word: word.value, // word name
                description: description.value, // description of this word
                sentences: clearList(examples), // sentences list
            },
            // send csrf-token
            beforeSend: function (xhr) {
                xhr.setRequestHeader("X-CSRFToken", `${csrf_token}`);
            },
            // if success then redirect to new word page
            success: function (response) {
                let category = response.new_category_id;
                let word = response.new_word_id;

                document.location.replace(`/main_page/category/${category}/word/${word}/`)
            },
            // if error in backend then show this error
            error: function (error_message) {
                let error = JSON.parse(error_message.responseText);
                makeToast(error.error);
            }
        })
    } else {
        // if data is not valid then show all error
        for (let i = 0; i < validator.error_messages.length; ++i) {
            makeToast(validator.error_messages[i])
        }
    }
}