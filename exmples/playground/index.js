import { Component } from "../../lib/component.js";

customElements.define("co-custom", class extends Component {
    constructor() { super("./custom.html"); }
});