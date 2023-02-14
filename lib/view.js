
/**
 * @param {HTMLElement} root 
 * @param {String} attrView 
 * @param {{}} bag 
 * @returns {{}} 
 */
function getViews(root = document.body, attrView = "view", bag = {}) {
    let elements = root.querySelectorAll(`[${attrView}]`);
    for (let element of elements) {
        let name = element.getAttribute(attrView);
        bag[name] = element;
    }
    return bag;
}

/**
 * @param {HTMLElement} root 
 * @param {String} attrView 
 * @returns {{}}
 */
function useViews(root = document.body, attrView = "view") {
    if (!root.views) {
        let views = getViews(root, attrView, {});
        root.views = views;
    }
    return root.views;
}

export { getViews, useViews };