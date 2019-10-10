const rollupConfig = require('kcd-scripts/config').getRollupConfig();

Object.assign(rollupConfig, {
  external: ['preact', 'react', 'prop-types'],
  output: [
    Object.assign(rollupConfig.output[0], {
      globals: {
        react: 'React',
        preact: 'preact',
        'prop-types': 'PropTypes'
      }
    })
  ]
});

module.exports = rollupConfig;
