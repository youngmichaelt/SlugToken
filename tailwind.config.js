module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'slugbackground': "url('/src/slugpng.png')"
      }
    },
    // screens: {
    //   'mobile': '400px'
    // }
  },
  plugins: [
    require('flowbite/plugin')
]
}