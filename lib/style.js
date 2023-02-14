
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

export { loadStyle };