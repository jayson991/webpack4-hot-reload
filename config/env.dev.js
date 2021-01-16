const envProd = require('./env.prod')
const { merge } = require('webpack-merge')

module.exports = merge(envProd, {
  NODE_ENV: JSON.stringify('development')
})
