const JsonIncWebpackPlugin = require('./json-inc-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin');

module.exports = (env) => {
  const plugins = [
    new CopyWebpackPlugin([
      {
        from: '**/*',
        to: './build/',
        context: './assets/'
      }
    ], { debug: 'warning' }),
    new JsonIncWebpackPlugin({
      pattern: './configuration/config.inc.json',
      output: './build'
    }),
  ];

  if (env !== 'prod') {
    plugins.push(new ExtraWatchWebpackPlugin({
      files: ['./configuration/**/*', './assets/**/*']
    }));
  }

  return {
    watchOptions: {
      ignored: ['node_modules', 'build'],
      aggregateTimeout: 300
    },
    entry: [
      './src/main.js',
    ],
    output: {
      filename: 'build/main.js',
      library: 'Indexer',
      libraryTarget: 'var'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader' + (!env === 'prod' ? '?cacheLoader' : ''),
          query: {
            presets: ['@babel/preset-env'],
            compact: false
          }
        }
      ]
    },
    plugins: plugins
  };
};
