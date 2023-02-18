import { getLayout, useLayouts } from "./layout.js";

class Component extends HTMLElement {

    constructor(srcLayout) {
        super();
        let root = this.attachShadow({ mode: "open" });
        this.#build(root, srcLayout);
    }

    /**
     * @param {ShadowRoot} root 
     * @param {String} srcLayout 
     */
    async #build(root, srcLayout) {
        let layout = await getLayout(srcLayout);
        if (layout) {
            let clone = layout.cloneNode(true);
            await useLayouts(clone);
            root.appendChild(clone);
        }
    }

}

export { Component };