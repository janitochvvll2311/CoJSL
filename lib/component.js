import { getLayout } from "./layout.js";

class Component {

    #layout;

    constructor(src) {
        this.setLayout(src);
    }

    get layout() { return this.#layout; }

    async setLayout(src) {
        let layout = await getLayout(src);
        if (layout) {
            this.#layout = layout.cloneNode(true);
        }
        this.onLayout(layout);
    }

    /**
     * @param {HTMLElement} layout 
     */
    onLayout(layout) { }

}

export { Component };