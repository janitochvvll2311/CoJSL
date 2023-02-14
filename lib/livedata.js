const DATA_LIST = [];

class LiveData {

    static dispatch_interval = 1000 / 30;

    #value;
    #changed;
    #observers;

    constructor(value) {
        this.#value = value;
        this.#observers = {};
        DATA_LIST.push(this);
    }

    get value() { return this.#value; }
    get changed() { return this.#changed; }

    /**
     * 
     * @param {*} owner 
     * @param {(value)=>void} callback 
     */
    observe(owner, callback) {
        if (!this.#observers[owner]) {
            this.#observers[owner] = [];
        }
        this.#observers[owner].push(callback);
        if (this.#value) {
            callback(this.#value);
        }
    }

    /**
     * @param {*} owner 
     */
    release(owner) {
        if (this.#observers[owner]) {
            delete this.#observers[owner];
        }
    }

    /**
     * @param {*} owner 
     */
    post(value) {
        this.#value = value;
        this.#changed = true;
    }

    /**
     */
    async notify() {
        for (let owner in this.#observers) {
            let callbacks = this.#observers[owner];
            for (let callback of callbacks) {
                callback(this.#value);
            }
        }
        this.#changed = false;
    }

}

/**
 */
async function dispatchLiveData() {
    for (let data of DATA_LIST) {
        if (data.changed) {
            await data.notify();
        }
    }
}

/**
 * @param {Number} ms 
 * @returns {Promise}
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 */
async function launchDispatcher() {
    await dispatchLiveData();
    await sleep(LiveData.dispatch_interval);
    launchDispatcher();
}

launchDispatcher();

export { LiveData };