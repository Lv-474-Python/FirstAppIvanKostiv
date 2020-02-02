function saveEditWord(categoryId, wordId) {
    let csrf_token = document.getElementsByName("csrfmiddlewaretoken")[0].value;

    let sentences = [];
    document.getElementsByName('sentences').forEach(element => sentences.push(element.value));

    $.ajax({
        type: 'PUT',
        url: `/main_page/${categoryId}/${wordId}/edit_word/`,
        data: {
            word: document.getElementsByName('word')[0].value,
            description: document.getElementsByName('description')[0].value,
            sentences: sentences
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("X-CSRFToken", `${csrf_token}`);
        },

        success: function () {
            document.location.replace(`/main_page/${categoryId}/${wordId}/`)
        },
        error: function () {
            alert("Not cool")
        }
    });
}