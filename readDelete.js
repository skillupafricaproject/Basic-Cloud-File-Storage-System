const fs = require("fs");

const readsFIle = (id) => {
  const dataBuffer = fs.readFileSync(id);
  const data = dataBuffer.toString();
  return data;
};
