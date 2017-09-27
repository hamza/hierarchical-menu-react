const path = require('path');

module.exports = {
  entry: './src/app.jsx',
  module: {
    rules: [
      {
        test: /\.js|.jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            query: {
              modules: true,
              localIdentName: '[local]___[hash:base64:5]',
            },
          }
        ]
      }, {
        test: /\index.html$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: 'index.html' }
          }
        ]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  }
};
