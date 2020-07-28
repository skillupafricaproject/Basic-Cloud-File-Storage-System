const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');
const usersController = require('./controllers/usersController');
const filesController = require('./controllers/filesController');
const statsController = require('./controllers/statsController');

const port = parseInt(process.env.PORT) || 3000;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const reqMethod = req.method;
  const route = url.parse(req.url, true);
  const { pathname } = route;
  if (pathname == '/users') {
    const { createNewUser } = usersController(fs, path, req, res);

    if (reqMethod === 'POST') createNewUser();
  }

  if (pathname == '/files') {
    const {
      readFile, createNewFile, updateFile, deleteFile
    } = filesController(fs, path, req, res);

    if (reqMethod === 'GET') readFile(route);
    if (reqMethod === 'POST') createNewFile();
    if (reqMethod === 'PUT') updateFile(route);
    if (reqMethod === 'DELETE') deleteFile(route);
  }

  if (pathname == '/stats') {
    const { getStats } = statsController(fs, path, req, res);

    if (reqMethod === 'GET') getStats(route);
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
