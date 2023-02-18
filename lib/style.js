const STYLES = {};

/**
 * @param {String} src 
 */
async function loadStyle(src) {
    if (!STYLES[src]) {
        let response = await fetch(src);
        if (response.ok) {
            let css = await response.text();
            let style = document.createElement("style");
            style.innerHTML = css;
            document.head.append(style);
            STYLES[src] = style;
        }
    }
}

/**
 * @param {HTMLElement} root 
 * @param {String} attrStyle
 * @returns {{}}
 */
async function useStyles(root = document.body, attrStyle = "_style") {
    let elements = root.querySelectorAll(`[${attrStyle}]`);
    for (let element of elements) {
        await loadStyle(element.getAttribute(attrStyle));
    }
    return STYLES;
}

export { loadStyle, useStyles };