import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
            },
            animation: {
                'spin-slow': 'spin 3s linear infinite',
                'gradient-x': 'gradient-x 8s ease infinite'
            },
            keyframes: {
                'gradient-x': {
                    '0%, 100%': { backgroundImage: 'linear-gradient(to right, #4facfe, #00f2fe)' },
                    '50%': { backgroundImage: 'linear-gradient(to right, #00f2fe, #4facfe)' }
                }
            },
            colors: {
                'main-blue': '#61A2DA',
                'secondary-blue': '#6CB7DA'
            }
        }
    },
    plugins: []
};
export default config;
