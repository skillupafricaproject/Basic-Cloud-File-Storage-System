const fs = require("fs");
//where "id" links to the path

const readsFIle = (id) => {
  const dataBuffer = fs.readFileSync(id);
  const data = dataBuffer.toString();
  return data;
};

const deletesFile = (id) => {
  try {
    fs.unlinkSync(id);
  } catch (err) {
    console.error(err);
  }
};
