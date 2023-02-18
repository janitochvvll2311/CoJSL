import { getLayout, useLayouts } from "./layout.js";

class Component extends HTMLElement {

    constructor(srcLayout) {
        super();
        this.#create(srcLayout);
    }

    /**
     * @param {String} srcLayout 
     */
    async #create(srcLayout) {
        let layout = await getLayout(srcLayout);
        if (layout) {
            this.innerHTML = null;
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
        this.onCreate();
    }

    onCreate() { }

}

export { Component };