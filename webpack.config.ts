import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

const devServer: DevServerConfiguration = {
  open: true,
  compress: true,
  hot: true,
  port: 'auto',
  client: {
    overlay: {
      errors: true,
      warnings: false,
    },
    progress: true,
  },
};

export default (
  env: { mode: 'development' | 'production' },
  _argv: unknown,
): webpack.Configuration => {
  return {
    mode: env.mode || 'production',
    entry: './src/index.tsx',
    output: {
      filename: 'bundle.[contenthash].js',
      path: path.resolve(__dirname, 'build'),
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }),
      new webpack.ProgressPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: 'ts-loader',
        },
      ],
    },
    devServer,
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
  };
};
