import { existsSync } from 'node:fs';
import path from 'node:path';

import 'webpack-dev-server';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import FriendlyErrorsPlugin from '@nuxt/friendly-errors-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import EslintWebpackPlugin from 'eslint-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import StylelintPlugin from 'stylelint-webpack-plugin';
import webpack from 'webpack';

const mode = process.env.NODE_ENV;

const isDevelopment = mode === 'development';
const isProduction = mode === 'production';

const isExample = existsSync(path.resolve(__dirname, '.env.example'));
const isDefaults = existsSync(path.resolve(__dirname, '.env.defaults'));

const config: webpack.Configuration = {
  devServer: {
    devMiddleware: {
      writeToDisk: true,
    },
    headers: {
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Authorization, Accept',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
    host: 'localhost',
    hot: true,
    open: true,
    port: 3000,
  },
  devtool: isDevelopment ? 'inline-source-map' : false,
  entry: './src/index.tsx',
  mode: isDevelopment ? 'development' : 'production',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.dev.json',
          },
        },
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        type: 'asset',
      },
      {
        exclude: /\.component\.svg(\?v=\d+\.\d+\.\d+)?$/,
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/inline',
        use: [
          {
            loader: 'svgo-loader',
            options: {
              name: 'preset-default',
              params: {
                overrides: {
                  convertColors: {
                    params: {
                      shorthex: false,
                    },
                  },
                  convertPathData: false,
                  removeTitle: true,
                },
              },
            },
          },
        ],
      },
      {
        exclude: /\.module\.scss$/,
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: isDevelopment } },
          {
            loader: 'postcss-loader',
            options: { sourceMap: isDevelopment },
          },
          { loader: 'sass-loader', options: { sourceMap: isDevelopment } },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: isDevelopment } },
          {
            loader: 'postcss-loader',
            options: { sourceMap: isDevelopment },
          },
        ],
      },
      {
        test: /\.module\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: '@teamsupercell/typings-for-css-modules-loader' },
          { loader: 'css-loader', options: { modules: true, sourceMap: isDevelopment } },
          {
            loader: 'postcss-loader',
            options: { sourceMap: isDevelopment },
          },
          { loader: 'sass-loader', options: { sourceMap: isDevelopment } },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ['gifsicle', { interlaced: false, optimizationLevel: 9 }],
              ['mozjpeg', { progressive: true, quality: 73 }],
              ['pngquant', { quality: [0.7, 0.8] }],
            ],
          },
        },
      }),
    ],
  },
  output: {
    clean: true,
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new Dotenv({
      allowEmptyValues: true,
      defaults: isDefaults,
      path: path.resolve(__dirname, '.env'),
      safe: isExample,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(mode),
    }),
    new HtmlWebpackPlugin({
      minify: !isDevelopment,
      template: path.resolve(__dirname, './index.ejs'),
    }),
    new StylelintPlugin(),
    new EslintWebpackPlugin({
      extensions: ['.ts', '.tsx'],
      failOnError: isProduction,
    }),
    new FriendlyErrorsPlugin(),
    new webpack.WatchIgnorePlugin({
      paths: [/css\.d\.ts$/],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/styles.css',
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  stats: isDevelopment
    ? {
        errorDetails: isDevelopment,
      }
    : 'errors-only',
};

export default config;
