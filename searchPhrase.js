const url = require("url");
const fs = require("fs");

const current_url = new URL(url);

const search_params = current_url.searchParams.get("phrase");
console.log(search_params);

const files = fs.readdirSync(testFolder);

phraseFIles = files.filter((e) => {
  readFileSync(e).toString();
  return fileincludes(phrase);
});
