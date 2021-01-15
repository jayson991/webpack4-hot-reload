const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const productionGzipExtensions = [ 'js', 'css' ]

module.exports = {
  mode: 'production',
  entry: {
    main: path.resolve(__dirname, '../src/index.js'),
  },
  output: {
    publicPath: '/',
    filename: 'scripts/[name].[contenthash:8].js',
    path: path.resolve(__dirname, '../dist'),
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
          MiniCssExtractPlugin.loader,
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
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../src/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash:8].css'
    }),
    new CompressionWebpackPlugin({
      filename: '[path][name].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
      threshold: 10240,
      minRatio: 0.8
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minChunks: 2,
      maxInitialRequests: 5,
      cacheGroups: {
        commons: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          name: 'common'
        }
      }
    },
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          map: {
            inline: false
          }
        }
      }),
      new TerserPlugin({
        sourceMap: false
      })
    ]
  }
}
