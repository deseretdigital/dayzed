const path = require('path');
const replace = require('replace-in-file');

const options = {
  files: path.resolve(__dirname, 'preact/dist/*'),
  from: ["'preact'", '"preact"'],
  to: "'preact/hooks'"
};

replace(options)
  .then(changes => {
    console.log('Modified files:', changes.join(', '));
  })
  .catch(error => {
    console.error('Error occurred:', error);
  });
