function collapsible(element) {
    if (element.getAttribute('aria-expanded') === 'true') {
        collapse(element)
    } else {
        expand(element)
    }
}

function expand(element) {
    element.setAttribute('transform', 'rotate(90)')
    element.setAttribute('aria-expanded', 'true')
}

function collapse(element) {
    element.setAttribute('transform', 'rotate(0)')
    element.setAttribute('aria-expanded', 'false')
}