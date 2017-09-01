const path = require('path');
const paths = require('./path-config.json');

const NODE_ENV = process.env.NODE_ENV || 'development';

const dotenv = require('dotenv');

const rootPath = path.join(__dirname, '..');
const rel = p => path.join(rootPath, p);
const src = (...p) => path.join(rootPath, 'src', paths.javascripts.src, ...p);

dotenv.config({path: rel(`.env.${NODE_ENV}`)});
dotenv.config({path: rel('.env')});

module.exports = {
  html: true,
  images: true,
  fonts: true,
  static: true,
  svgSprite: true,
  ghPages: true,
  stylesheets: true,

  javascripts: {
    entry: {
      // files paths are relative to
      // javascripts.dest in path-config.json
      app: ['./app.js']
    },
    hot: {
      enabled: true,
      reload: true,
      quiet: true,
      react: true
    },

    customizeWebpackConfig: function(webpackConfig, env, webpack) {
      if (env === 'production') {
        webpackConfig.devtool = 'nosources-source-map';
      }

      webpackConfig.resolve = Object.assign({}, webpackConfig.resolve, {
        alias: {
          lib: src('lib'),
          components: src('components')
        }
      });
      return webpackConfig;
    },
    plugins: webpack => [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(NODE_ENV)
        }
      })
    ]
  },

  browserSync: {
    server: {
      // should match `dest` in
      // path-config.json
      baseDir: 'public'
    }
  },

  production: {
    rev: true
  }
};
