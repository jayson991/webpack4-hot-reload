module.exports = {
  root: true,
  env: {
    amd: true,
    es6: true,
    node: true,
    jest: true,
    browser: true,
    commonjs: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  },
  extends: [ 'eslint:recommended', 'prettier' ],
  plugins: [ 'prettier' ],
  rules: {
    'no-unused-vars': 1,
    semi: [ 2, 'never' ],
    'react/prop-types': 0,
    quotes: [ 2, 'single' ],
    'object-curly-spacing': [ 2, 'always' ],
    'array-bracket-spacing': [ 2, 'always' ],
    'comma-spacing': [ 2, { before: false, after: true } ]
  }
}
