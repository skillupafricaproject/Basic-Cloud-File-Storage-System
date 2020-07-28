const fs = require('fs');
const path = require('path');

const username = 'tboyak';
const response = {};

let readDirectory;
try {
  readDirectory = fs.readdirSync(`./database/drives/${username}`);
  } catch (error) {
  response.status = 500,
  response.message = error.message;
  return response;
}

let id = parseInt((readDirectory[readDirectory.length - 1]).slice(0, readDirectory.lastIndexOf('.')));

let fileContent = "ETGHGS";
id++
try {
  fs.writeFileSync(`./database/drives/${username}/${id}.txt`, fileContent);
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




