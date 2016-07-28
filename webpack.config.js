const path = require('path');
const fs = require('fs');

const nodeModules = {};

fs.readdirSync('node_modules')
  .filter((x) => {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach((mod) => {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: {
    server: './src/index.js',
    mocked: './test/api/mocked-server.js'
  },
  target: 'node',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: [path.join(__dirname, 'src'), path.join(__dirname, 'test')],
        query: {
          presets: ['es2015', 'stage-0']
        }
      },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },
  externals: nodeModules,
  devtool: 'source-map'
};
