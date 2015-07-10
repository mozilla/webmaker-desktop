var path = require('path');
var fs = require('fs');

var webmakerCorePath = fs.realpathSync(path.resolve(
  __dirname,
  'node_modules/webmaker-core'
));

module.exports = {
  entry: __dirname + '/src/main.jsx',
  output: {
    path: __dirname + '/build/js',
    filename: '[name].bundle.js'
  },
  externals: {
    'react': 'React',
    'react/addons': 'React'
  },
  // http://webpack.github.io/docs/troubleshooting.html#npm-linked-modules-doesn-t-find-their-dependencies
  resolve: { fallback: path.join(__dirname, "node_modules") },
  resolveLoader: { fallback: path.join(__dirname, "node_modules") },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        include: [path.join(webmakerCorePath, 'src'), path.resolve(__dirname, 'src')]
      },
      {
        test: /\.jsx$/,
        loaders: ['babel-loader', 'jsx-loader'],
        include: [path.join(webmakerCorePath, 'src'), path.resolve(__dirname, 'src')]
      },
      {
        test: /\.json$/,
        loaders: ['json-loader'],
        include: [path.join(webmakerCorePath, 'node_modules'), path.resolve(__dirname, 'www_src'),  path.resolve(__dirname, 'node_modules')]
      }
    ]
  }
};
