function getNotUniqueArray(array) {
    let notUnique = [];
    for (let i = 0; i < array.length;) {
        let element = array.shift();
        for (let j = 0; j < array.length; ++j) {
            if (array[j] === element) {
                if (!notUnique.contains(element)) {
                    notUnique.push(element);
                }
                array.splice(j, 1);
                break;
            }
        }
    }
    return notUnique;
}

Array.prototype.contains = function (value) {
    for (let i = 0; i < this.length; i++) {
        if (this[i] === value) return true;
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

function stringsArrayToLowerCase(array) {
    for (let i = 0; i < array.length; ++i) {
        array[i] = array[i].toLowerCase()
    }

    return array
}

function makeToast(message) {
    $.toast({
        heading: "Error!",
        text: message,
        showHideTransition: 'slide',
        icon: 'error',
        hideAfter: 10000,
        position: 'bottom-right',
        loader: false,
        stack: 3,
    });
}

function makeTooltip(element, message) {
    $(element).tooltipster({
        content: message,
    })
}