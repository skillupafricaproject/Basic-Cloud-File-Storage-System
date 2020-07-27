const fs = require("fs");

const readsFIle = function (id) {
  const dataBuffer = fs.readFileSync(id);
  const data = dataBuffer.toString();
  return data;
};
