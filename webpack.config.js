const path = require('path');

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        loader: 'babel-loader',
        options: {
          presets: ['react', 'env'],
        },
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
};
