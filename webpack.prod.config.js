'use strict';

const path = require('path');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const basicConfig = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    environment: {
      // The environment supports arrow functions ('() => { ... }').
      arrowFunction: false,
      // The environment supports BigInt as literal (123n).
      bigIntLiteral: false,
      // The environment supports const and let for variable declarations.
      const: false,
      // The environment supports destructuring ('{ a, b } = obj').
      destructuring: false,
      // The environment supports an async import() function to import EcmaScript modules.
      dynamicImport: false,
      // The environment supports 'for of' iteration ('for (const x of array) { ... }').
      forOf: false,
      // The environment supports ECMAScript Module syntax to import ECMAScript modules (import ... from '...').
      module: false,
    },
    path: path.resolve(__dirname, './lib'),
    globalObject: `(typeof self !== 'undefined' ? self : this)`,
  },
  optimization: {
    minimize: true,
  },
  externals: {
    'react': 'react',
    'react-dom': 'react-dom',
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'ts-loader',
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
};

module.exports = [
  {
    ...basicConfig,
    output: {
      ...basicConfig.output,
      filename: 'index.js',
      library: 'lib',
      umdNamedDefine: true,
      libraryTarget: 'umd',
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
  },
  {
    ...basicConfig,
    output: {
      ...basicConfig.output,
      environment: {
        ...basicConfig.output.environment,
        module: true,
      },
      filename: 'index.mjs',
      libraryTarget: 'module',
    },
    experiments: {
      outputModule: true
    },
  },
];
