const fs = require('fs');
const path = require('path');

const readFile = function (id) {
  try {
    const dataBuffer = fs.readFileSync(path.resolve(__dirname, `${id}.txt`));
    const data = dataBuffer.toString();
    return {
      status: 200,
      data: {
        file: {
          id: `${id}.txt`,
          data,
        }
      },
    };
  } catch (err) {
    return {
      status: 404,
      message: 'No such file',
    };
  }
};

const deleteFile = function (id) { };

module.exports = { readFile, deleteFile };
