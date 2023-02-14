class Path {

    /**
     * @type {String[]}
     */
    #path;

    constructor(path) {
        this.#path = Array.isArray(path) ? path : path.split(".");
    }

    /**
     * @param {{}} obj 
     * @param {*} value 
     */
    set(obj, value) {
        for (let index in this.#path) {
            let key = this.#path[index];
            if (key) {
                if (index == this.#path.length - 1) {
                    obj[key] = value;
                }
                else if (!obj[key]) {
                    obj[key] = {};
                }
                obj = obj[key];
            }
        }
        return obj;
    }

    /**
     * @param {{}} obj 
     * @returns {{}} 
     */
    get(obj) {
        for (let index in this.#path) {
            let key = this.#path[index];
            if (key) {
                if (index == this.#path.length - 1) {
                    return obj[key];
                }
                else if (!obj[key]) {
                    return undefined;
                }
                obj = obj[key];
            }
        }
        return obj;
    }

}

export { Path };