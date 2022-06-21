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
        handleSubmit,
        setFocus,
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
            onSubmit={handleSubmit(submit)}
            autoComplete="off"
            className="flex flex-col gap-y-5 w-[85%] m-auto"
        >
            <img
                alt="Logo"
                src="favicon-128.png"
                onDragStart={(e) => e.preventDefault()}
                className="m-auto mb-5"
            />

            {userNotFound && (
                <small className="text-center text-red-600">
                    Datos no válidos
                </small>
            )}

            <div
                className="rounded-lg bg-gray-200 font-medium border-2
             focus-within:border-jewel focus-within:bg-transparent transition-all duration-200"
            >
                <input
                    {...register("user", {
                        required: true,
                        minLength: 10,
                        pattern: /^\d+$/,
                    })}
                    placeholder="Matrícula"
                    type="text"
                />
            </div>

            <div
                className="rounded-lg bg-gray-200 font-medium border-2
             focus-within:border-jewel focus-within:bg-transparent transition-all duration-200 relative"
            >
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
                    className="p-2 hover:bg-gray-300 rounded absolute inset-y-2 right-2 flex items-center"
                >
                    {toggle ? <EyeNoneIcon /> : <EyeOpenIcon />}
                </button>
            </div>

            <button
                type="submit"
                className="bg-jewel rounded-full p-4 font-bold text-white w-full hover:bg-eucalyptus"
            >
                {isSubmitting ? "..." : "Iniciar Sesión"}
            </button>
        </form>
    );
};
