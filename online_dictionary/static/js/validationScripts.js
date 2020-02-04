Array.prototype.contains = function (v) {
    for (let i = 0; i < this.length; i++) {
        if (this[i] === v) return true;
    }
    return false;
};

Array.prototype.unique = function () {
    let arr = [];
    for (let i = 0; i < this.length; i++) {
        if (!arr.contains(this[i])) {
            arr.push(this[i]);
        }
    }
    return arr;
};

function validateAddNewCategory(categoryName, subcategoryList) {
    let validator = {isValid: false, error_messages: []};
    let clearSubcategoryList = clearList(subcategoryList);
    let uniqueSubcategory = clearSubcategoryList.unique();

    for (let i = 0; i < subcategoryList.length - 1; ++i) {
        if (categoryName.value === subcategoryList[i].value) {

            $(categoryName).addClass("red-border");
            $(subcategoryList[i]).addClass("red-border");

            validator.isValid = false;
            if (!validator.error_messages.contains("You can't added similar subcategory"))
                validator.error_messages.push(
                    "You can't added similar subcategory"
                )
        } else {
            $(categoryName).removeClass("red-border");
            $(subcategoryList[i]).removeClass("red-border");
            validator.isValid = true;
        }

        if (!validateMinLength(subcategoryList[i].value, 3)) {
            $(subcategoryList[i]).addClass('red-border');

            validator.isValid = false;
            if (!validator.error_messages.contains("Category must contain at least 3 character"))
                validator.error_messages.push(
                    "Category must contain at least 3 character"
                );
        } else {
            $(categoryName).removeClass("red-border");
            $(subcategoryList[i]).removeClass("red-border");

            validator.isValid = true;
        }
    }

    if (!validateMinLength(categoryName.value, 3)) {
        $(categoryName).addClass("red-border");

        validator.isValid = false;
        if (!validator.error_messages.contains("Category must contain at least 3 character"))
            validator.error_messages.push(
                "Category must contain at least 3 character"
            );
    } else {
        $(categoryName).removeClass("red-border");
        validator.isValid = true;
    }


    // validate unique subcategory
    if (uniqueSubcategory.length !== clearSubcategoryList.length) {
        validator.isValid = false;

        let notUnique = [];

        for (let i = 0; i < clearSubcategoryList.length;) {
            let element = clearSubcategoryList.shift();

            for (let j = 0; j < clearSubcategoryList.length; ++j) {
                if (clearSubcategoryList[j] === element) {
                    if (!notUnique.contains(element)) {
                        notUnique.push(element);
                    }
                    clearSubcategoryList.splice(j, 1)
                    break;
                }
            }
        }

        for (let i = 0; i < subcategoryList.length - 1; ++i) {
            if (notUnique.contains(subcategoryList[i].value)) {
                $(subcategoryList[i]).addClass('red-border')
            } else {
                $(subcategoryList[i]).removeClass('red-border')
            }
        }

        if (!validator.error_messages.contains("You can't added similar subcategory"))
            validator.error_messages.push(
                "You can't added similar subcategory"
            );

    } else {
        validator.isValid = true;
    }


    return validator
}

function validateMinLength(value, minLength) {
    return value.length >= minLength
}