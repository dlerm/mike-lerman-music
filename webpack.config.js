const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const plugins = [
  new CleanWebpackPlugin(),
  new CopyPlugin([
    { from: 'src/templates', to: path.resolve(__dirname, 'dist'), flatten: true },
    { from: 'src/template-parts', to: path.resolve(__dirname, 'dist'), flatten: true }
  ], { copyUnmodified: true }),
  new MiniCssExtractPlugin({ filename: 'style.css' }),
];

const rules = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader'
    }
  },
  {
    test: /\.(css|scss)$/,
    exclude: /node_modules/,
    use: [
      'style-loader',
      MiniCssExtractPlugin.loader,
      'css-loader',
      'sass-loader',
    ]
  },
  {
    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/'
        }
      }
    ]
  },
];

module.exports = {
  // mode: 'development',
  // watch: true,
  devServer: {
    contentBase: './',
    // hot: true,
  },
  entry: {
    app: './src/scripts/app.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins,
  module: { rules },
};