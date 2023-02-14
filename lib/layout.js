const TEMPLATE = document.createElement("template");
const LATOUTS = {};

/**
 * @param {String} src 
 * @returns {DocumentFragment}
 */
async function getLayout(src) {
    let layout = LATOUTS[src];
    if (!layout) {
        let response = await fetch(src);
        if (response.ok) {
            let html = await response.text();
            TEMPLATE.innerHTML = html;
            layout = TEMPLATE.content.firstElementChild;
            LATOUTS[src] = layout;
        }
    }
    return layout;
}

/**
 * @param {HTMLElement} element 
 * @param {String} src 
 * @returns {HTMLElement}
 */
async function setLayout(element, src) {
    let layout = await getLayout(src);
    if (layout) {
        let clone = layout.cloneNode(true);
        for (let attribute of element.attributes) {
            clone.setAttribute(attribute.name, attribute.value);
        }
        element.replaceWith(clone);
        clone.layout = src;
        return clone;
    }
}

/**
 * @param {HTMLElement} root 
 * @param {String} attrLayout
 * @returns {{}}
 */
async function useTemplateLayouts(root = document.body, attrLayout = "layout") {
    let elements = root.querySelectorAll(`template[${attrLayout}]`);
    for (let element of elements) {
        LATOUTS[element.getAttribute(attrLayout)] = element.content.firstElementChild;
    }
    return LATOUTS;
}

/**
 * @param {HTMLElement} root 
 * @param {String} attrLayout
 * @returns {{}}
 */
async function useLayouts(root = document.body, attrLayout = "layout") {
    let elements = root.querySelectorAll(`[${attrLayout}]:not(template)`);
    for (let element of elements) {
        let clone = await setLayout(element, element.getAttribute(attrLayout));
        if (clone) {
            useLayouts(clone, attrLayout);
        }
    }
    return LATOUTS;
}

export { getLayout, setLayout, useTemplateLayouts, useLayouts };