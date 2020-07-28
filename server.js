const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');
const usersController = require('./controllers/usersController');
const filesController = require('./controllers/filesController');
const statsController = require('./controllers/statsController');

const port = parseInt(process.env.PORT) || 3000;

const server = http.createServer((req, res) => {
  const reqUrl = req.url;
  const reqMethod = req.method;

  if (reqUrl == '/users') {
    const route = url.parse(reqUrl, true);
    const { createNewUser } = usersController(fs, path, req, res);

    if (reqMethod === 'POST') createNewUser();
  }

  if (reqUrl == '/files') {
    const route = url.parse(reqUrl, true);
    const {
      readFile, createNewFile, updateFile, deleteFile
    } = filesController(fs, path, req, res);

    if (reqMethod === 'GET') readFile(route);
    if (reqMethod === 'POST') createNewFile();
    if (reqMethod === 'PUT') updateFile(route);
    if (reqMethod === 'DELETE') deleteFile(route);
  }

  if (reqUrl == '/stats') {
    const route = url.parse(reqUrl, true);
    const { getStats } = statsController(fs, path, req, res);

    if (reqMethod === 'get') getStats(route);
  }
});

switch (process.env.NODE_ENV) {
  case 'test':
    module.exports = () => server;
    break;

  default:
    server.listen(port, () => console.log(`server running`));
    break;
}
