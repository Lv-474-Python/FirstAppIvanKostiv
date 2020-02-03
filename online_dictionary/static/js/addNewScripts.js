function addNewCategory() {
    let csrf_token = document.getElementsByName("csrfmiddlewaretoken")[0].value;

    let category = document.getElementsByName('category')[0].value;
    let subcategories = [];
    document.getElementsByName('subcategories')
        .forEach((item, index, object) => {
            subcategories.push(item.value)
        });

    subcategories.forEach((item, index, object) => {
        if (item === "") {
            object.splice(index, 1)
        }
    });

    let validator = validateSubcategorySequence(category, subcategories);

    if (validator.isValid) {
        $.ajax({
            type: "POST",
            url: document.location.href,
            data: {
                category: category,
                subcategories: subcategories,
            },

            beforeSend: function (xhr) {
                xhr.setRequestHeader("X-CSRFToken", `${csrf_token}`);
            },
            success: function (response) {
                document.location.replace(`/main_page/${response.new_category_id}/`)
            },
            error: function (error_message) {
                let error = JSON.parse(error_message.responseText);

                $.toast({
                    heading: "Error!",
                    text: error.error,
                    showHideTransition: 'slide',
                    icon: 'error',
                    hideAfter: 5000,
                    position: 'bottom-right',
                    loader: false,
                    stack: 3,
                })
            }
        })
    } else {
        $.toast({
            heading: "Error!",
            text: validator.error_message,
            showHideTransition: 'slide',
            icon: 'error',
            hideAfter: 5000,
            position: 'bottom-right',
            loader: false,
            stack: 3,
        });
    }
}