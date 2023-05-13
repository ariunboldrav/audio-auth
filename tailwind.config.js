/** @type {import('tailwindcss').Config} **/
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './*.{html,js,ts,jsx}',
    './src/pages/**/*.{html,jsx,js}',
    './src/components/**/*.{html,jsx,js}',
    './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    './node_modules/tailwind-datepicker-react/dist/**/*.js',
  ],
  theme: {
    colors: {
      primary: '#7A5CFA',
    },
    fontFamily: {
      'fm-noto': ['Noto Sans Japanese', 'sans serif'],
    },
    extends: {
      colors: {
        primary: '#7A5CFA',
      },
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1rem',
      xl: '1rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
  },
  plugins: [require('flowbite/plugin')],
};
