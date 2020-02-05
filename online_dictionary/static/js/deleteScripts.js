function deleteSentence(sentence_id) {
    let csrf_token = document.getElementsByName("csrfmiddlewaretoken")[0].value;

    if (document.getElementsByName('sentences').length === 1) {
        $(`#${sentence_id}`).children(".icon").css('display', 'none');

        makeToast("You cannot delete the last sentence");
    } else {
        $.confirm({
            title: "<span style='color:#4B4B4B;'>Online dictionary</span>>",
            content: "<span style='color:#4B4B4B;'>You really want to delete this sentence?</span>",
            buttons: {
                yes: {
                    text: "Yes",
                    btnClass: 'btn-red',
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
                            error: function (errors) {
                                alert("Error:" + errors.responseText)
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

function deleteWord(categoryId, wordId) {
    let csrf_token = document.getElementsByName("csrfmiddlewaretoken")[0].value;

    $.confirm({
        title: "<span style='color:#4B4B4B;'>Online dictionary</span>>",
        content: "<span style='color:#4B4B4B;'>You really want to delete this word?</span>",
        buttons: {
            yes: {
                text: "Yes",
                btnClass: 'btn-red',
                action: () => {
                    $.ajax({
                        type: 'DELETE',
                        url: `/main_page/category/${categoryId}/word/${wordId}/`,

                        beforeSend: function (xhr) {
                            xhr.setRequestHeader("X-CSRFToken", `${csrf_token}`);
                        },
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

function deleteCategory(categoryId) {
    let csrf_token = document.getElementsByName("csrfmiddlewaretoken")[0].value;

    $.confirm({
        title: "<span style='color:#4B4B4B;'>Online dictionary</span>>",
        content: "<span style='color:#4B4B4B;'>You really want to delete this category?</span>",
        buttons: {
            yes: {
                text: "Yes",
                btnClass: 'btn-red',
                action: () => {
                    $.ajax({
                        type: 'DELETE',
                        url: `/main_page/category/${categoryId}/`,

                        beforeSend: function (xhr) {
                            xhr.setRequestHeader("X-CSRFToken", `${csrf_token}`);
                        },
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