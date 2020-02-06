function validateAddNewCategory(category, subcategories) {
    let validator = {isValid: true, error_messages: []};

    $(category).removeClass('red-border');

    subcategories.forEach((element) => {
        $(element).removeClass('red-border');
    });

    validateCategory(category, validator);
    validateUniqueSubcategory(subcategories, validator);

    for (let i = 0; i < subcategories.length - 1; ++i) {
        validateMinLengthSubcategory(subcategories[i], validator);
        validateCategoryAndSubcategorySimilar(category, subcategories[i], validator);
    }

    return validator
}

function validateAddNewWord(word, description, sentences) {
    let validator = {isValid: true, error_messages: []};

    $(word).removeClass('red-border');
    $(description).removeClass('red-border');

    sentences.forEach((element) => {
        $(element).removeClass('red-border');
    });

    validateWord(word, validator);
    validateDescription(description, validator);
    validateUniqueSentences(sentences, validator);
    validateOneOrMoreSentence(sentences, validator);

    for (let i = 0; i < sentences.length - 1; ++i) {
        validateWordAndSentenceSimilar(word, sentences[i], validator);
        validateDescriptionAndSentenceSimilar(description, sentences[i], validator);
        validateMinLengthSentence(sentences[i], validator);
    }

    return validator
}

function validateCategory(category, validator) {
    if (!validateMinLength(category.value, 3)) {
        $(category).addClass("red-border");

        addErrorToValidator(validator, "Category must contain at least 3 character");
    }

}

function validateUniqueSubcategory(subcategories, validator) {
    let clearSubcategoryList = stringsArrayToLowerCase(clearList(subcategories));
    let uniqueSubcategory = clearSubcategoryList.unique();

    if (uniqueSubcategory.length !== clearSubcategoryList.length) {
        validator.isValid = false;
        let notUnique = getNotUniqueArray(clearSubcategoryList);
        for (let i = 0; i < subcategories.length - 1; ++i) {
            if (notUnique.contains(subcategories[i].value.toLowerCase())) {
                $(subcategories[i]).addClass('red-border')
            }
        }
        addErrorToValidator(validator, "You can't added similar subcategory");
    }
}

function validateMinLengthSubcategory(subcategory, validator) {
    if (!validateMinLength(subcategory.value, 3)) {
        $(subcategory).addClass('red-border');

        addErrorToValidator(validator, "Category must contain at least 3 character");
    }
}

function validateCategoryAndSubcategorySimilar(category, subcategory, validator) {
    if (category.value.toLowerCase() === subcategory.value.toLowerCase()) {
        $(category).addClass("red-border");
        $(subcategory).addClass("red-border");

        addErrorToValidator(validator, "The title of the main category and the sub-category match");
    }
}

function validateWord(word, validator) {
    if (!validateMinLength(word.value, 3)) {
        $(word).addClass("red-border");

        addErrorToValidator(validator, "Word must contain at least 3 character");
    }
}

function validateDescription(description, validator) {
    if (!validateMinLength(description.value, 3)) {
        $(description).addClass("red-border");

        addErrorToValidator(validator, "Description must contain at least 3 character");
    }
}

function validateUniqueSentences(sentences, validator) {
    let clearSentences = stringsArrayToLowerCase(clearList(sentences));
    let uniqueSentences = clearSentences.unique();
    if (uniqueSentences.length !== clearSentences.length) {
        validator.isValid = false;
        let notUnique = getNotUniqueArray(clearSentences);

        for (let i = 0; i < sentences.length - 1; ++i) {
            if (notUnique.contains(sentences[i].value.toLowerCase())) {
                $(sentences[i]).addClass('red-border');
            }
        }
        addErrorToValidator(validator, "You can't added similar sentences");
    }
}

function validateWordAndSentenceSimilar(word, sentence, validator) {
    if (word.value.toLowerCase() === sentence.value.toLowerCase()) {
        $(word).addClass("red-border");
        $(sentence).addClass("red-border");

        addErrorToValidator(validator, "Sentences can not consist only of words entered");
    }
}

function validateDescriptionAndSentenceSimilar(description, sentence, validator) {
    if (description.value.toLowerCase() === sentence.value.toLowerCase()) {
        $(description).addClass("red-border");
        $(sentence).addClass("red-border");

        addErrorToValidator(validator, "A sentence cannot consist only of a description of the word");
    }
}

function validateOneOrMoreSentence(sentences, validator) {
    let clearSentences = stringsArrayToLowerCase(clearList(sentences));

    if (clearSentences.length < 1) {
        addErrorToValidator(validator, "At least one example should be added");
        sentences.forEach((element) => {
            $(element).addClass('red-border');
        })
    }
}

function validateMinLengthSentence(sentence, validator) {
    if (!validateMinLength(sentence.value, 3)) {
        $(sentence).addClass('red-border');
        addErrorToValidator(validator, "Sentence must contain at least 3 character");
    }
}

function validateMinLength(value, minLength) {
    return value.length >= minLength
}

function addErrorToValidator(validator, message) {
    validator.isValid = false;
    if (!validator.error_messages.contains(message))
        validator.error_messages.push(
            message
        );
}