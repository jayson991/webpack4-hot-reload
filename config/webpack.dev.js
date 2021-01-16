const path = require('path')
const env = require('./env.dev')
const webpack = require('webpack')
const ESLintPlugin = require('eslint-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, '../src/index.js'),
  },
  output: {
    publicPath: '/',
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  devServer: {
    hot: true,
    open: true,
    overlay: true,
    stats: {
      colors: true,
    },
    contentBase: path.join(__dirname, 'dist'),
  },
  resolve: {
    extensions: [ '.js' ],
    alias: {
      '@': path.resolve(__dirname, '../src/')
    }
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [ 'html-loader' ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [ 'babel-loader' ],
      },
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false
            }
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass')
            }
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|bmp|png|webp|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: 'images/[name].[hash:8].[ext]',
          outputPath: 'static',
          publicPath: path.resolve(__dirname, '../dist')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          filename: 'fonts/[name].[hash:8].[ext]'
        }
      },
      {
        exclude: [ /\.(js|css|scss)$/, /\.html$/, /\.json$/ ],
        loader: 'file-loader',
        options: {
          name: 'medias/[path][name].[hash:8].[ext]',
          outputPath: 'static',
          publicPath: path.resolve(__dirname, '../dist')
        }
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env,
      NODE_ENV: env.NODE_ENV
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ESLintPlugin(),
    new HTMLWebpackPlugin({
      template: './src/index.html',
    }),
  ],
}
