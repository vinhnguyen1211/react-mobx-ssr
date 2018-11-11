const dev = process.env.NODE_ENV !== 'production'
const path = require( 'path' )
const { BundleAnalyzerPlugin } = require( 'webpack-bundle-analyzer' )
const FriendlyErrorsWebpackPlugin = require( 'friendly-errors-webpack-plugin' )

const plugins = [
  new FriendlyErrorsWebpackPlugin()
]

if ( !dev ) {
  plugins.push( new BundleAnalyzerPlugin( {
    analyzerMode: 'static',
    reportFilename: 'webpack-report.html',
    openAnalyzer: false
  } ) )
}

module.exports = {
  mode: dev ? 'development' : 'production',
  context: path.join( __dirname, 'src' ),
  devtool: dev ? 'none' : 'source-map',
  entry: {
    app: './client.js'
  },
  resolve: {
    modules: [
      path.resolve( './src' ),
      'node_modules'
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname),
        exclude: /(node_modules)|(dist)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react', 'stage-2'],
            plugins:  [
              'transform-decorators-legacy',
              'transform-class-properties',
              'transform-object-rest-spread'
            ]
          }
        }
      }
    ]
  },
  output: {
    path: path.resolve( __dirname, 'dist' ),
    filename: '[name].bundle.js'
  },
  plugins
}
