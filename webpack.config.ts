import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

type TMode = 'none' | 'development' | 'production';

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

export default (env: { mode?: TMode }, _argv: unknown): webpack.Configuration => {
  const { mode = 'development' } = env;
  const isDevMode: Boolean = mode === 'development';

  return {
    mode,
    entry: './src/app/index.tsx',
    output: {
      filename: 'bundle.[contenthash].js',
      path: path.resolve(__dirname, 'build'),
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }),
      isDevMode && new webpack.ProgressPlugin(),
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
    devServer: isDevMode && devServer,
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    devtool: isDevMode ? 'eval-source-map' : undefined,
  };
};
