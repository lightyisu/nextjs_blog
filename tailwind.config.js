module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}','./components/**/*.{js,ts,tsx,jsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minWidth:{
      '300':'300px'
    },

 
    extend: {
      height:{
        '3.4r':'3.4rem'
      },
      backgroundImage:theme=>({
        'logo':'url("/images/logo.png")',
        'github-icon':'url("/images/github.png")',
        'all-icon':'url("/images/all.png")',
        'react-icon':'url("/images/react.png")',
        'vue-icon':'url("/images/vuejs.png")',
        'node-icon':'url("/images/nodejs.png")',
        'list-icon':'url("/images/list.png")'
      }),
      backgroundSize:{
        '90%':'90%',
        '75%':'75%'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
