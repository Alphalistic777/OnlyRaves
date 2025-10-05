/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Rainbow color palette for OnlyRaves
                rainbow: {
                    red: '#FF006E',
                    orange: '#FB5607',
                    yellow: '#FFBE0B',
                    green: '#8338EC',
                    blue: '#3A86FF',
                    pink: '#FF006E',
                    purple: '#8338EC',
                },
                // Kinky/Premium vibes
                neon: {
                    pink: '#FF006E',
                    purple: '#8338EC',
                    blue: '#3A86FF',
                    green: '#06FFA5',
                    yellow: '#FFBE0B',
                },
                // Dark theme for premium feel
                dark: {
                    900: '#0A0A0A',
                    800: '#1A1A1A',
                    700: '#2A2A2A',
                    600: '#3A3A3A',
                }
            },
            fontFamily: {
                'display': ['Inter', 'system-ui', 'sans-serif'],
                'body': ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'rainbow': 'rainbow 3s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'bounce-slow': 'bounce 2s infinite',
            },
            keyframes: {
                rainbow: {
                    '0%, 100%': { 'background-position': '0% 50%' },
                    '50%': { 'background-position': '100% 50%' },
                },
                glow: {
                    'from': { 'text-shadow': '0 0 20px rgba(255, 0, 110, 0.5)' },
                    'to': { 'text-shadow': '0 0 30px rgba(255, 0, 110, 0.8), 0 0 40px rgba(131, 56, 236, 0.5)' },
                }
            },
            backgroundImage: {
                'rainbow-gradient': 'linear-gradient(90deg, #FF006E, #FB5607, #FFBE0B, #8338EC, #3A86FF, #FF006E)',
                'neon-gradient': 'linear-gradient(135deg, #FF006E, #8338EC, #3A86FF)',
                'premium-gradient': 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 50%, #2A2A2A 100%)',
            },
        },
    },
    plugins: [],
}