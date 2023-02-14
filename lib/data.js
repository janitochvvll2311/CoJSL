import { Path } from "./path.js";

/**
 * @param {HTMLElement} element 
 * @param {String} attrData 
 */
function closestData(element, attrData = "data") {
    let source = element.closest(`[${attrData}]`);
    if (source && !source.data && source.parentElement) {
        let parentData = closestData(source.parentElement, attrData);
        if (parentData) {
            let path = new Path(element.getAttribute(attrData));
            source.data = path.get(parentData);
        }
    }
    return source?.data;
}

/**
 * @param {HTMLElement} root 
 * @param {String} attrData 
 * @returns {{}}
 */
function useData(root = document.body, attrData = "data") {
    let data = closestData(root, attrData);
    let elements = root.querySelectorAll(`[${attrData}]`);
    for (let element of elements) {
        closestData(element, attrData);
    }
    return data;
}

export { closestData, useData };