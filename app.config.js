const configs = [
  require('cozy-scripts/config/webpack.bundle.default'),
  {
    module: {
      rules: [
          {
            test: /\.(mp3|wav)$/i,
            loader: 'file-loader'
          }
      ]
    }
  }
]

module.exports = configs
