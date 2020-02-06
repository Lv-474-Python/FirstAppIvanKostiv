// function to delete sentence in word page
function deleteSentence(sentence_id) {
    let csrf_token = document.getElementsByName("csrfmiddlewaretoken")[0].value;

    // if this is last sentence then not delete his
    if (document.getElementsByName('sentences').length === 1) {
        $(`#${sentence_id}`).children(".icon").css('display', 'none');

        makeToast("You cannot delete the last sentence");
    } else {
        // Confirm to delete sentence
        $.confirm({
            title: "<span style='color:#4B4B4B;'>Online dictionary</span>>",
            content: "<span style='color:#4B4B4B;'>You really want to delete this sentence?</span>",
            buttons: {
                yes: {
                    text: "Yes",
                    btnClass: 'btn-red',
                    // if user clicked 'yes' then create ajax request to delete this sentence
                    action: () => {
                        $.ajax({
                            type: 'DELETE',
                            url: `/main_page/delete_sentence/`,
                            data: {
                                sentence_id: sentence_id
                            },

                            beforeSend: function (xhr) {
                                xhr.setRequestHeader("X-CSRFToken", `${csrf_token}`);
                            },
                            success: function () {
                                $(`#${sentence_id}`).remove();
                            },
                            error: function (error_message) {
                                let error = JSON.parse(error_message.responseText);
                                makeToast(error.error);
                            }
                        });
                    }
                },
                no: function () {
                }
            }
        })
    }
}

// function to delete word by wordId and categoryId
function deleteWord(categoryId, wordId) {
    let csrf_token = document.getElementsByName("csrfmiddlewaretoken")[0].value;

    // confirm to delete word
    $.confirm({
        title: "<span style='color:#4B4B4B;'>Online dictionary</span>>",
        content: "<span style='color:#4B4B4B;'>You really want to delete this word?</span>",
        buttons: {
            yes: {
                text: "Yes",
                btnClass: 'btn-red',
                // if user click 'yes' then send ajax request to delete word
                action: () => {
                    $.ajax({
                        type: 'DELETE',
                        url: `/main_page/category/${categoryId}/word/${wordId}/`,

                        beforeSend: function (xhr) {
                            xhr.setRequestHeader("X-CSRFToken", `${csrf_token}`);
                        },
                        // if success then redirect to category of this word
                        success: function () {
                            document.location.replace(`/main_page/category/${categoryId}/`)
                        },
                        error: function () {
                            alert("Not cool")
                        }
                    });
                }
            },
            no: function () {
            }
        }
    })

}

// function to delete category by categoryId
function deleteCategory(categoryId) {
    let csrf_token = document.getElementsByName("csrfmiddlewaretoken")[0].value;

    // confirm to delete category
    $.confirm({
        title: "<span style='color:#4B4B4B;'>Online dictionary</span>>",
        content: "<span style='color:#4B4B4B;'>You really want to delete this category?</span>",
        buttons: {
            yes: {
                text: "Yes",
                btnClass: 'btn-red',
                // if user clicked 'yes' then send ajax request to delete category
                action: () => {
                    $.ajax({
                        type: 'DELETE',
                        url: `/main_page/category/${categoryId}/`,

                        beforeSend: function (xhr) {
                            xhr.setRequestHeader("X-CSRFToken", `${csrf_token}`);
                        },
                        // if success then redirect to parent category or main page
                        success: function (data) {
                            if (data.parent_id != null) {
                                document.location.replace(`/main_page/category/${data.parent_id}/`)
                            } else {
                                document.location.replace(`/main_page/`)
                            }
                        },
                        error: function () {
                            alert("Not cool")
                        }
                    });
                }
            },
            no: function () {
            }
        }
    });
}