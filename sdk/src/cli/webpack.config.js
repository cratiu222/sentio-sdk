/* eslint-disable */
const path = require('path')

module.exports = {
  entry: {
    lib: './src/processor.ts',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(process.cwd(), 'dist'),
  },
  target: 'node',
  mode: 'production',
  externals: [
    {
      ethers: 'commonjs2 ethers',
      bs58: 'commonjs2 bs58',
      "bignumber.js": 'commonjs2 bignumber.js',
      'bn.js': 'commonjs2 bn.js',
      'csv-parse': 'commonjs2 csv-parse'
    },
    function ({ context, request }, callback) {
      if (/^@(ethersproject|solana|project-serum).*$/.test(request)) {
        return callback(null, 'commonjs ' + request)
      }
      if (request.startsWith("@sentio-sdk")) {
        return callback(null, 'commonjs2 ' + request)
      }
      callback()
    },
  ],
}
