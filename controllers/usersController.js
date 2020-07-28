const usersController = (fs, path, req, res) => {
  const users = require('../database/users.json');
  const serverStats = require('../database/stats/server-stats.json');

  const createNewUser = () => {
    let data;
    const resJson = {};

    req.on('data', chunk => {
      data = chunk;
    });
    req.on('end', () => {
      const { username, password } = JSON.parse(data);
      const dirPath = path.resolve(__dirname, `../database/drives/${username}`);

      if (!fs.existsSync(dirPath)) {
        const newNumberOfUsers = users.push({ username, password });
        serverStats.no_of_users = newNumberOfUsers;
        serverStats.no_of_folders = newNumberOfUsers;
        fs.mkdirSync(dirPath);

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

        resJson.statusCode = 201;
        resJson.message = "Success";
      } else {
        resJson.statusCode = 403;
        resJson.message = "Username taken. Choose a different username";
      }

      res.writeHead(resJson.statusCode);
      res.end(resJson.message);
      return resJson;
    });
  }

  return { createNewUser };
}

module.exports = usersController;
