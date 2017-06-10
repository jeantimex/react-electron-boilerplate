import webpack from 'webpack';
import path from 'path';

const sourcePath = path.resolve('src/main');
const outputPath = path.resolve('app/dist');

export default (env) => {
  const nodeEnv = env && env.prod ? 'production' : 'development';
  const isProd = nodeEnv === 'production';

  const plugins = [
    new webpack.EnvironmentPlugin({
      NODE_ENV: nodeEnv,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      DIR_NAME: '__dirname',
    })
  ];

  if (isProd) {
    plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
        },
        output: {
          comments: false,
        },
        sourceMap: true,
      })
    );
  }

  return {
    devtool: isProd ? 'source-map' : 'inline-source-map',
    context: sourcePath,

    target: 'electron',

    entry: {
      main: './index.js'
    },

    output: {
      path: outputPath,
      filename: '[name].bundle.js',
    },

    externals(context, request, callback) {
      callback(null, request.charAt(0) === '.' ? false : `require("${request}")`);
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            'babel-loader'
          ],
        }
      ]
    },

    resolve: {
      extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
      modules: [
        path.resolve('node_modules')
      ],
      alias: {}
    },

    plugins,

    performance: isProd && {
      maxAssetSize: 500000,
      maxEntrypointSize: 300000,
      hints: 'warning',
    }
  };
};