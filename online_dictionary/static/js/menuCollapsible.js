function collapsible(element) {
    if (element.getAttribute('aria-expanded') === 'true') {
        collapse(element, element.getAttribute('data-target'));
    } else {
        expand(element, element.getAttribute('data-target'));
    }
}

function expand(icon, element) {
    icon.setAttribute('transform', 'rotate(90)');
    $(element).expand();
}

function collapse(icon, element) {
    icon.setAttribute('transform', 'rotate(0)');
    $(element).collapse();
}