const fs = require('fs');

const createFile = (filePath, fileContent) => {
  try {
    fs.writeFileSync(filePath, fileContent);
    return {
      status: 200,
      message: 'New file created'
    }
  } catch (error) {
    return {
      status: 500,
      message: error.message
    }
  }
}

createFile(path, content);