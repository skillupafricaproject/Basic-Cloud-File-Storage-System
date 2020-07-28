
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
      message: err.message,
    };
  }
};

const deleteFile = (id) => {
  try {
    fs.unlinkSync(path.resolve(__dirname, `${id}.txt`));
    return {
      status: 200,
      message: `File ${id}.txt deleted successfully`,
    };
  } catch (err) {
    return {
      status: 500,
      message: err.message,
    };
  }
};

module.exports = { readFile, deleteFile };
