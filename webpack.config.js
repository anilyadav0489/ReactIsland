var webpack = require('webpack');

module.exports = {
  entry: [
    'script-loader!jquery/dist/jquery.min.js',
    'script-loader!foundation-sites/dist/foundation.min.js',
    'app.jsx'
  ],
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    })
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    modules: [
      __dirname,
      "node_modules"
    ],
    alias: {
      Main: 'components/Main.jsx',
      IslandWallet: 'components/IslandWallet.jsx',
      IslandStore: 'components/IslandStore.jsx',
      Message: 'components/Message.jsx',
      IslandCountSetter: 'components/IslandCountSetter.jsx',
      IslandPool: 'components/IslandPool.jsx',
      Island: 'components/Island.jsx',
      StartGame: 'components/StartGame.jsx',
      applicationStyles: 'styles/app.scss',
      islandPicker: 'api/islandPicker.jsx'
    },
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map'
};
