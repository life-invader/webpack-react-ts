import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import BundleAnalyzer from 'webpack-bundle-analyzer';
import webpack from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

type TMode = 'none' | 'development' | 'production';
interface IEnv {
  mode?: TMode;
}

const devServer: DevServerConfiguration = {
  open: true,
  compress: true,
  hot: true,
  port: 'auto',
  watchFiles: ['src/**/*'],
  historyApiFallback: true,
  client: {
    overlay: {
      errors: true,
      warnings: false,
    },
    progress: true,
  },
};

export default (env: IEnv, _argv: unknown): webpack.Configuration => {
  const { mode = 'development' } = env;
  const isDevMode: Boolean = mode === 'development';

  return {
    mode,
    entry: './src/app/index.tsx',
    output: {
      filename: 'js/bundle.[contenthash].js',
      path: path.resolve(__dirname, 'build'),
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }),
      isDevMode && new webpack.ProgressPlugin(),
      !isDevMode &&
        new MiniCssExtractPlugin({
          filename: 'css/style.[contenthash].css',
        }),
      new BundleAnalyzer.BundleAnalyzerPlugin({ analyzerPort: 'auto' }),
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
        {
          test: /\.s[ac]ss$/i,
          use: [
            isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
      ],
    },
    devServer: isDevMode && devServer,
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
      alias: {
        '@entities': path.resolve(__dirname, 'src', 'entities'),
        '@pages': path.resolve(__dirname, 'src', 'pages'),
        '@shared': path.resolve(__dirname, 'src', 'shared'),
        '@widgets': path.resolve(__dirname, 'src', 'widgets'),
      },
    },
    devtool: isDevMode ? 'eval-source-map' : undefined,
  };
};
