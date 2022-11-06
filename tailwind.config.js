/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            keyframes: {
                loading: {
                    '0%': { left: '-30%' },
                    '50%': { left: '80%' },
                    '100%': { left: '-30%' },
                },
            },
            animation: {
                loading: 'loading 2000ms infinite',
            },
        },
    },
    plugins: [],
};
