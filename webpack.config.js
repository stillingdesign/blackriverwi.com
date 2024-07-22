const path = require('path');
module.exports = {
  entry: {
    'main': '/src/assets/javascript/main.js',
    'home': '/src/assets/javascript/pages/home.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist/assets/javascript'),
    filename: '[name].js'
  }
};