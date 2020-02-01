function deleteSentence(sentence_id) {
    let csrf_token = document.getElementsByName("csrfmiddlewaretoken")[0].value;

    if (document.getElementsByName('sentences').length === 1) {
        $(`#${sentence_id}`).children(".icon").css('display', 'none');

        alert("Sorry, you can't delete last sentence")
    } else {
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
            error: function () {
                alert("Not cool")
            }
        });
    }
}

function deleteWord(categoryId, wordId) {
    let csrf_token = document.getElementsByName("csrfmiddlewaretoken")[0].value;
    $.ajax({
        type: 'DELETE',
        url: `/main_page/${categoryId}/${wordId}/`,

        beforeSend: function (xhr) {
            xhr.setRequestHeader("X-CSRFToken", `${csrf_token}`);
        },
        success: function () {
            document.location.replace(`/main_page/${categoryId}/`)
        },
        error: function () {
            alert("Not cool")
        }
    });
}