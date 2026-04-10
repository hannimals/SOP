import type { Config } from 'tailwindcss';

export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                background: '#b0949b',
                foreground: '#000000',
                muted: '#a1a1ad',
                border: '#27272a',
                card: '#70709a',
                accent: '#90b751',
                'accent-hover': '#649b12',
                primary: '#ffcbd8',
            },
            fontFamily: {
                sans: ['Geist', 'system-ui', 'sans-serif'],
            },
        },
    },
} satisfies Config;
