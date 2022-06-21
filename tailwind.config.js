/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,tsx}"],
    theme: {
        fontFamily: {
            body: ["Space Grotesk", "sans-serif"],
        },
        extend: {
            colors: {
                jewel: "#0f7246",
                "dusty-gray": "#999999",
                eucalyptus: "#278059",
                "cod-gray": "#1c1c1c",
                shark: "#1f2126",
            },
        },
    },
    plugins: [],
};
