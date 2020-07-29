const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');
const navControllers = require('./controllers/navControllers');
const usersController = require('./controllers/usersController');
const filesController = require('./controllers/filesController');
const statsController = require('./controllers/statsController');

const port = parseInt(process.env.PORT, 10) || 3000;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const reqMethod = req.method;
  const route = url.parse(req.url, true);
  const { pathname } = route;
  if (pathname === '/') {
    const { navigate } = navControllers(fs, path, req, res);

    if (reqMethod === 'GET') navigate(route);
  }

  if (pathname === '/users') {
    const { createNewUser } = usersController(fs, path, req, res);

    if (reqMethod === 'POST') createNewUser();
  }

  if (pathname === '/files') {
    const {
      readFile, createNewFile, updateFile, deleteFile,
    } = filesController(fs, path, req, res);

    if (reqMethod === 'GET') readFile(route);
    if (reqMethod === 'POST') createNewFile(route);
    if (reqMethod === 'PUT') updateFile(route);
    if (reqMethod === 'DELETE') deleteFile(route);
  }

  if (pathname === '/stats') {
    const { readStats } = statsController(fs, path, req, res);

    if (reqMethod === 'GET') readStats(route);
  }
});

switch (process.env.NODE_ENV) {
  case 'test':
    module.exports = () => server;
    break;

  default:
    server.listen(port, () => console.log(`server running on port ${port}`));
    break;
}
