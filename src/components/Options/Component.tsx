import * as React from "react";

export const Options = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen dark:bg-shark bg-white gap-y-2">
            <img
                alt="Logo"
                src="favicon-128.png"
                onDragStart={(e) => e.preventDefault()}
            />

            <a
                className="text-2xl underline dark:text-cyan-600 text-blue-600"
                href="https://github.com/zavbala/proyecta-utch"
                target="_blank"
                rel="noreferrer"
            >
                Open Source
            </a>

            <p className="dark:text-white text-black text-lg font-bold">
                Made by Jeremy Zabala
            </p>
        </div>
    );
};
