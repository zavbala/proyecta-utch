import { browser } from "webextension-polyfill-ts";

browser.runtime.onMessage.addListener((request: { popupMounted: boolean }) => {
    if (request.popupMounted) {
        console.log("Hello World!");
    }
});
