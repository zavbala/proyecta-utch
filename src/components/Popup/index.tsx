import * as React from "react";
import * as ReactDOM from "react-dom";
import { browser } from "webextension-polyfill-ts";
import { Popup } from "./Component";

import "../../styles/app.css";

browser.tabs.query({ active: true, currentWindow: true }).then(() => {
    ReactDOM.render(<Popup />, document.getElementById("popup"));
});
