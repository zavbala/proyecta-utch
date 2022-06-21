import { CheckIcon, RocketIcon } from "@radix-ui/react-icons";
import { MainContext } from "@src/components/Popup/Component";
import { fetcher, normalizeData } from "@src/lib/helpers";
import type { Generic } from "@src/lib/types";
import * as React from "react";
import useSWR from "swr";

type Stores = typeof TABS[number]["title"];

const TABS = [
    {
        id: "1",
        title: "Calificaciones",
        icon: RocketIcon,
    },
    {
        id: "2",
        title: "Asistencias",
        icon: CheckIcon,
    },
    // {
    //     id: "3",
    //     title: "Perfil",
    //     icon: PersonIcon,
    // },
];

export const Dashboard = () => {
    const { token } = React.useContext(MainContext);
    const [currentTab, setCurrentTab] = React.useState("Calificaciones");

    const { data: res, error } = useSWR(
        [token && "store", { id: token }, currentTab],
        fetcher,
    );

    const renderView = (tab: Stores) => {
        const rows = normalizeData(
            (res?.data as []) || [],
            tab === "Calificaciones" ? "calificaciones" : "asistencias",
        );
        return {
            Calificaciones: <Table rows={rows} skipCol={-1} />,
            Asistencias: <Table rows={rows} />,
        }[tab];
    };

    return (
        <>
            <header className="bg-jewel rounded-t-md p-3 flex items-center justify-around h-[75px]">
                {TABS.map((tab) => (
                    <button
                        {...tab}
                        key={tab.title}
                        className={`p-2 rounded transition-all duration-100 ${
                            currentTab === tab.title
                                ? "bg-white cursor-default"
                                : "hover:bg-gray-50/20"
                        }`}
                        onClick={(event) => {
                            const { title } = event.currentTarget;
                            setCurrentTab(title);
                        }}
                    >
                        {
                            <tab.icon
                                width="20"
                                height="20"
                                color={`${
                                    currentTab === tab.title
                                        ? "#0f7246"
                                        : "#fff"
                                }`}
                            />
                        }
                    </button>
                ))}
            </header>

            <div className="h-[400px] hover:overflow-y-auto overflow-hidden p-5">
                {!res ? (
                    <span> ... </span>
                ) : error ? (
                    <span> {":("} </span>
                ) : (
                    renderView(currentTab)
                )}
            </div>
        </>
    );
};

interface TableProps {
    rows: {
        metadata: Generic;
        cols: [string | number];
    }[];
    skipCol?: number;
}

const Table = ({ rows, skipCol }: TableProps) => {
    return (
        <>
            {rows.map((row, index) => {
                const { metadata, cols } = row;
                return (
                    <article
                        key={index}
                        className="flex items-center justify-between mb-5 flex-1"
                    >
                        <div className="flex-none w-[55%]">
                            <h1 className="text-xs font-bold break-words">
                                {metadata.materia}
                            </h1>
                            <span className="text-xs break-words">
                                {metadata.profesor
                                    .split(" ")
                                    .slice(1)
                                    .join(" ")}
                            </span>
                        </div>

                        <span className="bg-jewel h-5 w-0.5" />

                        <div className="flex items-center justify-around flex-1">
                            {cols
                                .slice(0, skipCol || undefined)
                                .map((col, index) => (
                                    <small
                                        key={index}
                                        className="text-center text-sm"
                                    >
                                        {String(col).split(".")[0]}
                                    </small>
                                ))}
                        </div>
                    </article>
                );
            })}
        </>
    );
};
