import { Dashboard } from "@src/components/Dashboard";
import { Footer } from "@src/components/Footer";
import { Form } from "@src/components/Form";
import React from "react";
import { browser } from "webextension-polyfill-ts";
import css from "./styles.module.css";

interface MainContextInterface {
    token: string;
    setToken: (value: string) => void;
}

export const MainContext = React.createContext<MainContextInterface>({
    token: "",
    setToken: () => {},
});

export function Popup() {
    const [token, setToken] = React.useState("");

    React.useEffect(() => {
        browser.storage.local
            .get("token")
            .then(({ token }) => {
                if (token) setToken(token);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div
            className={css.popupContainer}
            onContextMenu={(e) => e.preventDefault()}
        >
            <MainContext.Provider value={{ token, setToken }}>
                {token ? <Dashboard /> : <Form />}
                <Footer />
            </MainContext.Provider>
        </div>
    );
}
