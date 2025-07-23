const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },

  // To process html file(s); one unique (new) plugin needed per html file
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/template.html"}),
  ],


  module: {
          rules: [
              {
                  // process css files, needs two dev dependencies in specific order
                  test: /\.css$/i,
                  use: ['style-loader', 'css-loader'],
              },
              {
                  //process image files mentioned in html, needs one dev dependency
                  test: /\.html$/i,
                  use: ['html-loader'],
              },
              {
                  // process image files imported in js, no dependencies needed
                  test: /\.(png|svg|jpg|jpeg|gif)$/i,
                  type: 'asset/resource',
              },
              /*
              {
                  // process font files, no dependencies needed
                  test: /\.(woff|woff2|eot|ttf|otf)$/i,
                  type: 'asset/resource',
              },
              {
                  // process csv files, needs one dev dependency
                  test: /\.(csv|tsv)$/i,
                  use: ['csv-loader'],
              },
              {
                  // process xml files, needs one dev dependency
                  test: /\.xml$/i,
                  use: ['xml-loader'],
              },
              {
                  // process toml (json-like) files, needs one dependency
                  test: /\.toml$/i,
                  type: 'json',
                  parser: {
                    parse: toml.parse,
                  },
                },
                {
                  // process yaml (json-like) files, needs one dependency
                  test: /\.yaml$/i,
                  type: 'json',
                  parser: {
                    parse: yaml.parse,
                  },
                },
                {
                  // process json5 (json-like) files, needs one dependency
                  test: /\.json5$/i,
                  type: 'json',
                  parser: {
                    parse: json5.parse,
                  },
                },
                */
          ],
      },
};