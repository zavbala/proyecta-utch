import { ExitIcon, GearIcon } from "@radix-ui/react-icons";
import { MainContext } from "@src/components/Popup/Component";
import * as React from "react";
import { browser } from "webextension-polyfill-ts";

export const Footer = () => {
    const { token, setToken } = React.useContext(MainContext);

    return (
        <footer className="flex items-center justify-between px-3 py-2 h-[75px]">
            <div />

            <div>
                <button
                    type="button"
                    title="Configuración"
                    className="p-2 hover:bg-gray-200 rounded"
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
                        className="p-2 rounded bg-red-600 hover:bg-red-700 ml-2"
                    >
                        <ExitIcon color="#fff" />
                    </button>
                )}
            </div>
        </footer>
    );
};
