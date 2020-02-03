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

function validateSubcategorySequence(categoryName, subcategoryList) {
    let uniqueSubcategory = subcategoryList.unique();

    if (subcategoryList.contains(categoryName))
        return {
            isValid: false,
            error_message: "The name of the main category and sub-category match"
        };

    if (uniqueSubcategory.length !== subcategoryList.length)
        return {
            isValid: false,
            error_message: "You can't added similar subcategory",
        };

    if (!validateMinLength(categoryName, 3)) {
        return {
            isValid: false,
            error_message: "Category must contain at least 3 character"
        }
    }

    for (let i = 0; i < uniqueSubcategory.length; ++i) {
        if (!validateMinLength(uniqueSubcategory[i], 3))
            return {
                isValid: false,
                error_message: "Category must contain at least 3 character"
            }
    }

    return {isValid: true}
}

function validateMinLength(value, minLength) {
    return value.length >= minLength
}