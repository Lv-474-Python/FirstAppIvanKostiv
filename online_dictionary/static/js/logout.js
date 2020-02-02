function logout() {
    let csrf_token = document.getElementsByName("csrfmiddlewaretoken")[0].value;
    $.ajax({
        type: 'GET',
        url: `/logout/`,

        beforeSend: function (xhr) {
            xhr.setRequestHeader("X-CSRFToken", `${csrf_token}`);
        },
        success: function (data) {
            document.location.replace('/sign_in/')
        },
        error: function () {
            alert("Not cool")
        }
    });
}