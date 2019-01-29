module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/recommended',
    'airbnb-base',
  ],
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    'import/no-unresolved': 0,
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state',
      ]
    }],
  }
}
