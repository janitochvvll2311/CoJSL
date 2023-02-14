
/**
 * @param {HTMLElement} container 
 * @param {[]} items 
 * @param {HTMLElement} template 
 * @param {(element: HTMLElement, item: *, index: Number)} binder 
 */
function setListItems(container, items, template, binder) {
    let diff = container.childElementCount - items.length;
    if (diff < 0) {
        for (let i = diff; i < 0; i++) {
            container.append(template.cloneNode(true));
        }
    }
    else if (diff > 0) {
        for (let i = diff; i > 0; i--) {
            container.children[container.children.length - i].remove();
        }
    }
    for (let i = 0; i < items.length; i++) {
        binder(container.children[i], items[i], i);
    }
}

export { setListItems };