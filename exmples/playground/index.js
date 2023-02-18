import { Component } from "../../lib/component.js";

class CustomComponent extends Component {

    constructor() {
        super("./custom.html");
    }

}

customElements.define("co-custom", CustomComponent);