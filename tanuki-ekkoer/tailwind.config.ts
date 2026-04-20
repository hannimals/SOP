import type { Config } from 'tailwindcss';

export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                background: '#f5f3ef',
                foreground: '#191516',
                muted: '#E0A877',
                border: '#191516',
                card: '#C9F0FF',
                accent: '#007CBE',
                'accent-light': '#EAFFFD',
                'accent-hover': '#0066a0',
                primary: '#007CBE',
                secondary: '#E0A877',
            },
            fontFamily: {
                sans: ['Geist', 'system-ui', 'sans-serif'],
            },
        },
    },
} satisfies Config;
