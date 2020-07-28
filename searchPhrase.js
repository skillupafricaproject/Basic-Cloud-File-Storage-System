const url = require("url");
const fs = require("fs");

const current_url = url.parse(address, true); //where address is the path url
const phrase = req.query.phrase;

const files = fs.readdirSync(username);

phraseFIles = files.filter((file) => {
  readFileSync(file).toString();
  return fileincludes(phrase);
});
