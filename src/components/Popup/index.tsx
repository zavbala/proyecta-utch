import * as React from "react";
import * as ReactDOM from "react-dom";
import { browser } from "webextension-polyfill-ts";
import "../../styles/app.css";
import { Popup } from "./Component";

browser.tabs.query({ active: true, currentWindow: true }).then(() => {
    ReactDOM.render(<Popup />, document.getElementById("popup"));
});
