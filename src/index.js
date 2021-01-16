if (process.env.NODE_ENV === 'development') {
  require('@babel/runtime/regenerator')
  require('webpack-hot-middleware/client?reload=true')
}

import './styles/index.css'

require('./index.html')
