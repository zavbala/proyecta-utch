import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { MainContext } from "@src/components/Popup/Component";
import { fetcher } from "@src/lib/helpers";
import type { User } from "@src/lib/types";
import { MD5 } from "crypto-js";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { browser } from "webextension-polyfill-ts";

type Fields = {
    user: string;
    password: string;
};

export const Form = () => {
    const { setToken } = React.useContext(MainContext);
    const [toggle, setToggle] = React.useState(false);
    const [userNotFound, setUserNotFound] = React.useState(false);

    const {
        register,
        setFocus,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<Fields>({
        mode: "onChange",
    });

    React.useEffect(() => {
        setFocus("user");
    }, []);

    const submit: SubmitHandler<Fields> = async (values) => {
        values.password = MD5(values.password).toString();
        const { data, error } = await fetcher<User>("auth", values);

        if (!error) {
            browser.storage.local.set({ token: data.id });
            setToken(data.id);
        } else {
            setUserNotFound(true);
        }
    };

    return (
        <form
            autoComplete="off"
            onSubmit={handleSubmit(submit)}
            className="m-auto flex w-[85%] flex-col gap-y-5"
        >
            <img
                alt="Logo"
                src="Pyta.svg"
                className="m-auto mb-5"
                onDragStart={(e) => e.preventDefault()}
            />

            {userNotFound && (
                <small className="text-center text-red-600">
                    Datos no válidos
                </small>
            )}

            <div className="input-text transition-all duration-200">
                <input
                    type="text"
                    placeholder="Matrícula"
                    {...register("user", {
                        required: true,
                        minLength: 10,
                        pattern: /^\d+$/,
                    })}
                />
            </div>

            <div className="input-text relative transition-all duration-200">
                <input
                    {...register("password", {
                        required: true,
                    })}
                    placeholder="Contraseña"
                    type={toggle ? "text" : "password"}
                />

                <button
                    type="button"
                    onClick={() => setToggle(!toggle)}
                    className="absolute inset-y-2 right-2 flex items-center rounded p-2 hover:bg-gray-300"
                >
                    {toggle ? <EyeNoneIcon /> : <EyeOpenIcon />}
                </button>
            </div>

            <button
                type="submit"
                className="w-full rounded-full bg-jewel p-4 font-bold text-white hover:bg-eucalyptus"
            >
                {isSubmitting ? "..." : "Iniciar Sesión"}
            </button>
        </form>
    );
};
