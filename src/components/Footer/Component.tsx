import { ExitIcon, GearIcon } from "@radix-ui/react-icons";
import { MainContext } from "@src/components/Popup/Component";
import * as React from "react";
import { browser } from "webextension-polyfill-ts";

export const Footer = () => {
    const { token, setToken } = React.useContext(MainContext);

    return (
        <footer className="flex h-[75px] items-center justify-between px-3 py-2">
            <div />

            <div>
                <button
                    type="button"
                    title="Configuración"
                    className="rounded p-2 hover:bg-gray-200"
                    onClick={async () =>
                        await browser.tabs.create({ url: "options.html" })
                    }
                >
                    <GearIcon />
                </button>

                {token && (
                    <button
                        type="button"
                        title="Cerrar Sesión"
                        onClick={async () => {
                            await browser.storage.local.remove("token");
                            setToken("");
                        }}
                        className="ml-2 rounded bg-red-600 p-2 hover:bg-red-700"
                    >
                        <ExitIcon color="#fff" />
                    </button>
                )}
            </div>
        </footer>
    );
};
