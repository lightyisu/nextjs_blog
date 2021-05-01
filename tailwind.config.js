module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}','./components/**/*.{js,ts,tsx,jsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minWidth:{
      '300':'300px'
    },
    extend: {
      backgroundImage:theme=>({
        'github-icon':'url("/images/github.png")',
        'all-icon':'url("/images/all.png")',
        'react-icon':'url("/images/react.png")',
        'vue-icon':'url("/images/vuejs.png")',
        'node-icon':'url("/images/nodejs.png")',
        'list-icon':'url("/images/list.png")'
      })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
