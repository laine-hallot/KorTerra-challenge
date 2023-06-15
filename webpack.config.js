// Generated using webpack-cli https://github.com/webpack/webpack-cli
import 'dotenv/config'

import pkg from 'webpack';
const { DefinePlugin } = pkg;

import path from 'path';
import { fileURLToPath } from 'url';

import HtmlWebpackPlugin from 'html-webpack-plugin';

const isProduction = process.env.NODE_ENV == 'production';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  entry: './index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    open: true,
    host: 'localhost',
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    compress: true,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new DefinePlugin({
      'process.env': {
        GH_ACCESS_TOKEN: JSON.stringify(process.env.GH_ACCESS_TOKEN),
        }
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(ts|tsx)$/i,
        exclude: ['/node_modules/'],
        loader: 'ts-loader',
        options: {
          compilerOptions: {
            noEmit: false, // this option will solve the issue
          },
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
  },
};

export default () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }
  return config;
};
