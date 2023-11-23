/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    // allowImportExportEverywhere: true, // 不限制eslint对import使用位置
  },
  rules: {
    'vue/multi-word-component-names' : 'off'
  },
}
