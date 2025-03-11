const fs = require('fs');

function writeDataToFile(filename, content) {
  fs.writeFileSync(filename, JSON.stringify(content, null, 2), 'utf8');
}

module.exports = {
  writeDataToFile,
};
