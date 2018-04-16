const { prettier: prettierConfig } = require('kcd-scripts/config');

module.exports = Object.assign(prettierConfig, {
  semi: true,
  singleQuote: true,
  trailingComma: 'none',
  bracketSpacing: true
});
