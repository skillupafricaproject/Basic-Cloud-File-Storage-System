const users = require('../database/users.json');
const serverStats = require('../database/stats/server-stats.json');

const filesController = (fs, path, req, res) => {
  const readFile = (route) => {
    const { fileId, username } = route.query;
    const resJson = {};

    try {
      const dataBuffer = fs.readFileSync(
        path.resolve(__dirname, `../database/drives/${username}/${fileId}.txt`),
      );
      const fileContent = dataBuffer.toString();

      resJson.statusCode = 200;
      resJson.data = {
        file: {
          id: `${fileId}.txt`, content: fileContent,
        },
      };

      res.writeHead(resJson.statusCode);
      res.write(JSON.stringify(resJson.data));
      res.end();
      return resJson;
    } catch (err) {
      if (err.code === 'ENOENT') resJson.statusCode = 404;
      else resJson.statusCode = 500;
      resJson.message = err.message;
      res.writeHead(resJson.statusCode);
      res.write(resJson.message);
      res.end();
      return resJson;
    }
  };

  const createNewFile = (route) => {
    const { username } = route.query;
    const resJson = {};
    let data;

    req.on('data', (chunk) => {
      data = chunk;
    });
    req.on('end', () => {
      const { fileContent } = JSON.parse(data);

      let drives;
      try {
        drives = fs.readdirSync(path.resolve(`./database/drives/${username}`));
      } catch (err) {
        if (err.code === 'ENOENT') resJson.statusCode = 404;
        else resJson.statusCode = 500;
        resJson.message = err.message;
        res.writeHead(resJson.statusCode);
        res.write(resJson.message);
        res.end();
        return resJson;
      }

      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
          users[i].totalFilesCreated++;
          users[i].totalFilesPresent++;
          break;
        }
      }

      serverStats.totalFiles++;

      try {
        fs.writeFileSync(path.resolve(__dirname, '../database/users.json'), JSON.stringify(users));
      } catch (error) {
        resJson.statusCode = 500;
        res.writeHead(resJson.statusCode);
        res.end();
        return resJson;
      }

      try {
        fs.writeFileSync(path.resolve(__dirname, '../database/stats/server-stats.json'), JSON.stringify(serverStats));
      } catch (error) {
        resJson.statusCode = 500;
        res.writeHead(resJson.statusCode);
        res.end();
        return resJson;
      }

      let id = parseInt(drives[drives.length - 1].slice(0, drives.lastIndexOf('.')), 10);
      try {
        fs.writeFileSync(`./database/drives/${username}/${id++}.txt`, fileContent);
        resJson.statusCode = 201;
        resJson.message = 'New file created';
        res.writeHead(resJson.statusCode);
        res.write(resJson.message);
        res.end();
        return resJson;
      } catch (err) {
        if (err.code === 'ENOENT') resJson.statusCode = 404;
        else resJson.statusCode = 500;
        resJson.message = err.message;
        res.writeHead(resJson.statusCode);
        res.write(resJson.message);
        res.end();
        return resJson;
      }
    });
  };

  const updateFile = (route) => {
    const resJson = {};
    let data;
    const { username, fileId } = route;
    const filePath = path.resolve(__dirname, `../database/drives/${username}/${fileId}.txt`);

    req.on('data', (chunk) => {
      data = chunk;
    });
    req.on('end', () => {
      resJson.statusCode = 200;
      resJson.message = '';
      resJson.data = data;
      res.writeHead(resJson.statusCode);
      res.write(resJson.message);
      res.end(filePath);
      return resJson;
    });
  };

  const deleteFile = (route) => {
    const { fileId, username } = route.query;
    const resJson = {};

    try {
      fs.unlinkSync(path.resolve(__dirname, `../database/drives/${username}/${fileId}.txt`));

      resJson.statusCode = 200;
      resJson.message = `File ${fileId}.txt deleted successfully`;

      res.writeHead(resJson.statusCode);
      res.end(resJson.message);
      return resJson;
    } catch (err) {
      if (err.code === 'ENOENT') resJson.statusCode = 404;
      else resJson.statusCode = 500;
      resJson.message = err.message;
      res.writeHead(resJson.statusCode);
      res.write(resJson.message);
      res.end();
      return resJson;
    }
  };

  return {
    readFile, createNewFile, updateFile, deleteFile,
  };
};

module.exports = filesController;
