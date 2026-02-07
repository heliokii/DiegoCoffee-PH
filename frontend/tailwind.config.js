/* eslint-env node */
/* eslint-disable-next-line */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    asideScrollbars: {
      light: 'light',
      gray: 'gray',
    },
    extend: {
      zIndex: {
        '-1': '-1',
      },
      flexGrow: {
        5: '5',
      },
      maxHeight: {
        'screen-menu': 'calc(100vh - 3.5rem)',
        modal: 'calc(100vh - 160px)',
      },
      transitionProperty: {
        position: 'right, left, top, bottom, margin, padding',
        textColor: 'color',
      },
      keyframes: {
        'fade-out': {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        'fade-in': {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        'chaos-shake': {
          '0%, 100%': { transform: 'translateX(0) rotate(0)' },
          '10%': { transform: 'translateX(-2px) rotate(-1deg)' },
          '20%': { transform: 'translateX(2px) rotate(1deg)' },
          '30%': { transform: 'translateX(-2px) rotate(-1deg)' },
          '40%': { transform: 'translateX(2px) rotate(1deg)' },
          '50%': { transform: 'translateX(-2px) rotate(-1deg)' },
          '60%': { transform: 'translateX(2px) rotate(1deg)' },
          '70%': { transform: 'translateX(-2px) rotate(-1deg)' },
          '80%': { transform: 'translateX(2px) rotate(1deg)' },
          '90%': { transform: 'translateX(-2px) rotate(-1deg)' },
        },
        sparkle: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.5, transform: 'scale(1.2)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'fade-out': 'fade-out 250ms ease-in-out',
        'fade-in': 'fade-in 250ms ease-in-out',
        'chaos-shake': 'chaos-shake 0.5s ease-in-out infinite',
        sparkle: 'sparkle 1.5s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        'spin-slow': 'spin-slow 8s linear infinite',
      },
      colors: {
        diego: {
          navy: '#001F3F',
          accent: '#FACC15',
        },
        dark: {
          900: '#131618',
          800: '#21242A',
          700: '#2C2F36',
          600: '#9CA3AF',
          500: '#CBD5E1',
        },
        green: {
          text: '#45B26B',
        },
        pavitra: {
          blue: '#0162FD',
          green: '#00B448',
          red: '#F20041',
          900: '#14142A',
          800: '#4E4B66',
          700: '#6E7191',
          600: '#A0A3BD',
          500: '#D9DBE9',
          400: '#EFF0F6',
          300: '#F7F7FC',
        },
        midnightBlueTheme: {
          text: '#F5F5F0',
          textMuted: '#9CA3AF',
          iconsColor: '#FACC15',
          mainBG: '#1E3A5F',
          buttonColor: '#FACC15',
          cardColor: '#374151',
          outsideCardColor: '#4B5563',
          webSiteComponentBg: '#FACC153D',
          testimonials: '#4B5563',
          pricing: '#4B5563',
          diversityContact: '#131618',
          diversityMain: '#FACC15',
          diversityHeader: '#FACC15',
          900: '#0F172A',
          800: '#1E3A5F',
        },
        primaryText: '#F5F5F0',
        coolGray: '#9CA3AF',
      },
      fontFamily: {
        sans: ['Montserrat', 'Open Sans', 'Roboto', 'sans-serif'],
        heading: ['Bebas Neue', 'sans-serif'],
        display: ['Anton', 'sans-serif'],
        comic: ['Bangers', 'cursive'],
        bold: ['Montserrat', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '2rem',
        '4xl': '3rem',
        '5xl': '4rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'aside-scrollbars': (value) => {
            const track = value === 'light' ? '100' : '900';
            const thumb = value === 'light' ? '300' : '600';
            const color = value === 'light' ? 'gray' : value;

            return {
              scrollbarWidth: 'thin',
              scrollbarColor: `${theme(`colors.${color}.${thumb}`)} ${theme(
                `colors.${color}.${track}`,
              )}`,
              '&::-webkit-scrollbar': {
                width: '8px',
                height: '8px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: theme(`colors.${color}.${track}`),
              },
              '&::-webkit-scrollbar-thumb': {
                borderRadius: '0.25rem',
                backgroundColor: theme(`colors.${color}.${thumb}`),
              },
            };
          },
        },
        { values: theme('asideScrollbars') },
      );
    }),
  ],
};
