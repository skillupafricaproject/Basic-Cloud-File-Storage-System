const fs = require('fs');

const createFile = (filePath, fileContent) => {
  fs.writeFileSync(filePath, fileContent, (error) => {
  if (error) {
  console.error('An error occured: ', error);
  } else {
  console.log ('Your file is created');
  }
  });
  }

  createFile(path, content);