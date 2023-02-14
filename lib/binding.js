import { LiveData } from "./livedata.js";
import { Path } from "./path.js";

/**
 * @param {String} attr
 * @returns {String} 
 */
function getProperty(attr) {
    switch (attr) {
        case "text": return "innerText";
        case "html": return "innerHTML";
    }
    return attr;
}

/**
 * @param {HTMLElement} element 
 * @returns {{}}
 */
function setBindings(element) {
    clearBindings(element);
    let bindings = {};
    for (let attribute of element.attributes) {
        if (attribute.value.startsWith("{") && attribute.value.endsWith("}")) {
            let parts = attribute.value.substring(1, attribute.value.length - 1).split(":");
            let path = new Path(parts[0]);
            let event = parts[1];
            //
            let property = getProperty(attribute.name);
            let data = element.data;
            let value = path.get(data);
            //
            let binding = { event };
            if (value instanceof LiveData) {
                value.observe(element, value => {
                    element[property] = value;
                });
                binding.setter = value;
                binding.getter = event => {
                    value.post(element[property]);
                };
                if (event) {
                    element.addEventListener(event, binding.getter);
                }
            }
            else {
                binding.setter = value => {
                    element[property] = path.get(data);
                };
                binding.setter();
                binding.getter = event => {
                    path.set(data, element[property]);
                };
                if (event) {
                    element.addEventListener(event, binding.getter);
                }
            }
            bindings[attribute.name] = binding;
        }
    }
    element.bindings = bindings;
    return bindings;
}

/**
 * @param {HTMLElement} element 
 */
function clearBindings(element) {
    let bindings = element.bindings;
    if (bindings) {
        for (let attr in bindings) {
            let binding = bindings[attr];
            if (binding.setter instanceof LiveData) {
                binding.setter.release(element);
            }
            element.removeEventListener(binding.event, binding.getter);
        }
    }
}

/**
 * 
 * @param {HTMLElement} root 
 * @param {String} attrBinding
 * @returns {{}}
 */
function useBindings(root = document.body, attrBinding = "bind") {
    let bindings = setBindings(root);
    let elements = root.querySelectorAll(`[${attrBinding}]`);
    for (let element of elements) {
        setBindings(element);
    }
    return bindings;
}

export { setBindings, useBindings, clearBindings };