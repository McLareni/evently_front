/** @type {import('tailwindcss').Config} */

export default {
  mode: 'jit',
  content: [
    './src/**/*.html',
    './src/**/*.js',
    './src/**/*.ts',
    './src/**/*.tsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
        lora: ['Lora', 'serif'],
      },
      colors: {
        // Main color
        lightBlue: '#D7EBFF',
        lightPurple: '#E2DEFF',
        lightGreen: '#CFFFCF',
        lightPink: '#FFD6F7',
        buttonPurple: '#9B8FF3',
        hoverCard: '#F4F3FF',
        borderColor: '#00CED1',

        //Neutral color
        background: '#F8FBFF',
        lightGray: '#F4F4F4',
        gray: '#E8EAEC',
        darkGray: '#D0D5D8',
        textDark: '#062341',
        lightRed: '#FF6262',
        uploadBtnBg: '#ABAFB1',

        // Other color
        success: '#3BE660',
        error: '#FF0F00',
      },
      boxShadow: {
        primaryBtnActive: 'inset -5px 5px 50px 0 rgba(255, 255, 255, 0.7)',
        shadowPrimaryBtn: '-5px 5px 36.7px 0px rgba(0, 0, 0, 0.25) inset',
        shadowSecondaryBtn: `inset 0 0 9px 0 rgba(155, 143, 243, 1)`,
        eventCardShadow: `4px 4px 4px rgba(155, 143, 243, 0.2);`,

        shadowActivePrimaryBtn:
          '-5px 5px 50px 0px rgba(255, 255, 255, 0.70) inset',
        shadowActiveSecondaryBtn: '9px 5px 30px 0px #9B8FF3 inset',
      },
      opacity: {
        disabled: '0.5',
      },
      // spacing: {
      //   sm: '8px',
      //   md: '16px',
      //   lg: '24px',
      //   xl: '32px',
      // },
      typography: {
        fontFamily: {
          sans: ['Open Sans', 'sans-serif'],
          serif: ['Merriweather', 'serif'],
          lato: ['LatoRegular'],
        },
        fontSize: {
          xs: '12px',
          sm: '14px',
          md: '16px',
          lg: '18px',
          xl: '20px',
          '2xl': '24px',
        },
      },
      backgroundImage: {
        'bg-gradient': 'linear-gradient(123deg, #E9E6FF 0%, #D5FEFF 100%)',
        'badge-gradient': 'linear-gradient(90deg, #12C2E9 0%, #C471ED 90%)',
        'filter-btn-gradient':
          'linear-gradient(123.03deg, #9B8FF3 0%, #38F6F9 100%)',
        'dark-gradient':
          'linear-gradient(98deg, #12C2E9 2.11%, #C471ED 75.16%)',
        eventDetails:
          'linear-gradient(123deg, rgba(155, 143, 243, 0.80) 0%, rgba(56, 246, 249, 0.80) 100%)',
      },
      gridTemplateColumns: {
        custom: 'minmax(300px, 1fr) 1fr',
      },
    },
  },
  // variants: {
  //   // Expample of using tailwindcss dark mode
  //   // extend: {
  //   //   backgroundColor: ['dark'],
  //   // },
  // },
  plugins: [],
};
