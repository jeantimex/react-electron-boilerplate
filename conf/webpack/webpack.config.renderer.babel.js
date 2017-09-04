import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const sourcePath = path.resolve('src/renderer');
const outputPath = path.resolve('app/dist');

export default env => {
  const nodeEnv = env && env.prod ? 'production' : 'development';
  const isProd = nodeEnv === 'production';

  const extractSass = new ExtractTextPlugin({
    filename: '[name].bundle.css',
    disable: false,
    allChunks: true,
  });

  const plugins = [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js',
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: nodeEnv,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({}),
    extractSass,
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
  } else {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  return {
    devtool: isProd ? 'source-map' : 'inline-source-map',
    context: sourcePath,

    entry: {
      app: './index.js',
      vendor: ['react'],
    },

    output: {
      path: outputPath,
      filename: '[name].bundle.js',
    },

    module: {
      rules: [
        {
          test: /\.s?css$/,
          include: [sourcePath, path.resolve('node_modules/todomvc-app-css')],
          use: extractSass.extract({
            use: [
              {
                loader: 'css-loader',
              },
              {
                loader: 'sass-loader',
              },
            ],
            fallback: 'style-loader',
          }),
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
      ],
    },

    resolve: {
      extensions: [
        '.webpack-loader.js',
        '.web-loader.js',
        '.loader.js',
        '.js',
        '.jsx',
        '.css',
      ],
      modules: [path.resolve('node_modules'), sourcePath],
      alias: {
        actions: path.resolve('src/renderer/actions'),
        components: path.resolve('src/renderer/components'),
        reducers: path.resolve('src/renderer/reducers'),
        store: path.resolve('src/renderer/store'),
      },
    },

    plugins,

    externals(context, request, callback) {
      let isExternal = false;
      const load = ['electron'];
      if (load.includes(request)) {
        isExternal = `require("${request}")`;
      }
      callback(null, isExternal);
    },

    performance: isProd && {
      maxAssetSize: 500000,
      maxEntrypointSize: 500000,
      hints: 'warning',
    },

    devServer: {
      contentBase: sourcePath,
      disableHostCheck: true,
      historyApiFallback: true,
      host: 'localhost',
      port: 3000,
      compress: isProd,
      inline: !isProd,
      hot: !isProd,
      stats: {
        assets: true,
        children: false,
        chunks: false,
        hash: false,
        modules: false,
        publicPath: false,
        timings: true,
        version: false,
        warnings: true,
      },
    },
  };
};
