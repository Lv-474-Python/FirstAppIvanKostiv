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
                console.log(error_message)
                let error = JSON.parse(error_message.responseText);

                $.toast({
                    heading: "Error!",
                    text: error.error,
                    showHideTransition: 'slide',
                    icon: 'error',
                    hideAfter: 10000,
                    position: 'bottom-right',
                    loader: false,
                    stack: 3,
                })
            }
        })
    } else {

        for (let i = 0; i < validator.error_messages.length; ++i) {
            $.toast({
                heading: "Error!",
                text: validator.error_messages[i],
                showHideTransition: 'slide',
                icon: 'error',
                hideAfter: 10000,
                position: 'bottom-right',
                loader: false,
                stack: 3,
            });
        }
    }
}

function clearList(list) {
    let array = [];
    list.forEach((item) => {
        array.push(item.value)
    });

    array.forEach((item, index, object) => {
        if (item === "") {
            object.splice(index, 1)
        }
    });

    return array
}