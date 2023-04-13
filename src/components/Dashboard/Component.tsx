import { CheckIcon, FileTextIcon } from "@radix-ui/react-icons";
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
        icon: FileTextIcon,
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
            <header className="flex h-[75px] items-center justify-around bg-jewel p-3">
                {TABS.map((tab) => (
                    <button
                        {...tab}
                        key={tab.title}
                        className={`rounded p-2 transition-all duration-100 ${
                            currentTab === tab.title
                                ? "cursor-default bg-white"
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

            <div className="h-[400px] overflow-hidden p-5 hover:overflow-y-auto">
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
                        className="mb-5 flex flex-1 items-center justify-between"
                    >
                        <div className="w-[55%] flex-none">
                            <h1 className="break-words text-xs font-bold">
                                {metadata.materia}
                            </h1>
                            <span className="break-words text-xs">
                                {metadata.profesor
                                    .split(" ")
                                    .slice(1)
                                    .join(" ")}
                            </span>
                        </div>

                        <span className="h-5 w-0.5 bg-jewel" />

                        <div className="flex flex-1 items-center justify-around">
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
