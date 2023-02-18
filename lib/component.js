import { getLayout, useLayouts } from "./layout.js";

class Component extends HTMLElement {

    constructor(srcLayout) {
        super();
        this.#build(srcLayout);
    }

    /**
     * @param {String} srcLayout 
     */
    async #build(srcLayout) {
        let layout = await getLayout(srcLayout);
        if (layout) {
            for (let attribute of layout.attributes) {
                if (!this.hasAttribute(attribute.name)) {
                    this.setAttribute(attribute.name, attribute.value);
                }
            }
            for (let child of layout.childNodes) {
                let clone = child.cloneNode(true);
                this.append(clone);
            }
            useLayouts(this);
        }
    }

}

export { Component };