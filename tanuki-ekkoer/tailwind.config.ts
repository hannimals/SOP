import type { Config } from 'tailwindcss';

export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                background: '#191516',
                foreground: '#fafafa',
                muted: '#a1a1a1',
                border: '#27272a',
                card: '#393940',
                accent: '#a3e635',
                'accent-hover': '#84cc16',
                primary: '#191516',
            },
            fontFamily: {
                sans: ['Geist', 'system-ui', 'sans-serif'],
            },
        },
    },
} satisfies Config;
