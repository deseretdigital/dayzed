const prettierConfig = require('kcd-scripts/prettier');

module.exports = Object.assign(prettierConfig, {
  semi: true,
  singleQuote: true,
  trailingComma: 'none',
  bracketSpacing: true
});
