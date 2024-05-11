/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./source/**/*.{js,ts,jsx,tsx}'],
    darkMode: ['[data-layout-mode="dark"]'],
    theme: {
        extend: {
            colors: {
                // primary: {
                //     50: '#f3fbf9',
                //     100: '#cef0e7',
                //     200: '#9de0ce',
                //     300: '#6bd1b6',
                //     400: '#3ac19d',
                //     500: '#09b285',
                //     600: '#078e6a',
                //     700: '#056b50',
                //     800: '#044735',
                //     900: '#02241b',
                // },
                // secondary: {
                //     50: '#fffcf8',
                //     100: '#fff4e1',
                //     200: '#ffe9c4',
                //     300: '#ffdea6',
                //     400: '#ffd389',
                //     500: '#FFC86B',
                //     600: '#cca056',
                //     700: '#997840',
                //     800: '#66502b',
                //     900: '#332815',
                // },
                confirm: {
                    50: '#f3f8fb',
                    100: '#cee3f0',
                    200: '#9dc6e1',
                    300: '#6baad1',
                    400: '#3a8dc2',
                    500: '#0971B3',
                    600: '#075a8f',
                    700: '#05446b',
                    800: '#042d48',
                    900: '#021724',
                },
                dark: {
                    500: '#292e33',
                    600: '#212529',
                },
                white: '#FFFEFD',
                black: '#161616',
                primary: {
                    100: '#cef0e7',
                    200: '#9de0ce',
                    300: '#6bd1b6',
                    400: '#3ac19d',
                    500: '#09b285',
                    600: '#078e6a',
                    700: '#056b50',
                    800: '#044735',
                    900: '#02241b',
                },
                secondary: {
                    100: '#fff4e1',
                    200: '#ffe9c4',
                    300: '#ffdea6',
                    400: '#ffd389',
                    500: '#ffc86b',
                    600: '#cca056',
                    700: '#997840',
                    800: '#66502b',
                    900: '#332815',
                },
            },
            screens: {
                mobile: {
                    max: '1024px',
                },
                tablet: {
                    min: '768px',
                    max: '1024px',
                },
                phone: {
                    max: '767px',
                },
                web: {
                    min: '1025px',
                },
            },
            fontSize: {
                none: 0, // Adiciona um utilitário `text-none` para definir o tamanho da fonte como 0
            },
        },
    },
    plugins: [require('daisyui'), require('./deps/@tailwindcss/forms')],
    daisyui: {
        themes: [
            {
                light: {
                    primary: '#09b285',
                    secondary: '#FFC86B',
                    confirm: '#0971B3',
                    accent: '#37cdbe',
                    neutral: '#f3f3f9',
                    'base-100': '#f3f3f9',
                },
                dark: {
                    primary: '#09b285',
                    secondary: '#FFC86B',
                    confirm: '#0971B3',
                    accent: '#37cdbe',
                    neutral: '#f3f3f9',
                    'base-100': '#f3f3f9',
                },
                // dark: {
                //     secondary: '#056b50',
                //     primary: '#FFC86B',
                //     confirm: '#0971B3',
                //     accent: '#37cdbe',
                //     neutral: '#ffffff',
                //     'base-100': '#f3f3f9',
                // },
            },
        ],
    },
}
