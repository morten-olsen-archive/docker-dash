import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

const __DEV__ = process.env.NODE_ENV !== 'production';

const targetPath = path.join(__dirname, 'build', __DEV__ ? 'dev' : 'dist');

const config: Configuration[] = [{
  mode: __DEV__ ? 'development' : 'production',
  entry: './src/electron.ts',
  target: 'electron-main',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [{
      test: /\.ts$/,
      include: /src/,
      use: [{ loader: 'ts-loader' }]
    }]
  },
  output: {
    path: path.join(targetPath, 'electron'),
    filename: 'index.js'
  },
}, {
  mode: 'development',
  entry: './src/frontend.tsx',
  target: 'electron-renderer',
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  devtool: 'source-map',
  module: { rules: [{
    test: /\.ts(x?)$/,
    include: /src/,
    use: [{ loader: 'ts-loader' }]
  }] },
  output: {
    path: path.join(targetPath, 'frontend'),
    filename: 'index.js',
    publicPath: '../frontend',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
}];

export default config;
