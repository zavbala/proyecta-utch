import * as React from "react";

export const Options = () => {
    return (
        <div className="flex h-screen flex-col items-center justify-center gap-y-2 bg-white dark:bg-shark">
            <img
                alt="Logo"
                src="Pyta.svg"
                onDragStart={(e) => e.preventDefault()}
            />

            <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/zavbala/proyecta-utch"
                className="text-2xl text-blue-600 underline dark:text-cyan-600"
            >
                Open Source
            </a>

            <p className="text-lg font-bold text-black dark:text-white">
                Made by Jeremy Zabala
            </p>
        </div>
    );
};
