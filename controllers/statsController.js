const statsController = (fs, path, req, res) => {
  const readStats = () => {
    const resJson = {};
    const data = {
      totalUsers: 0, totalFolders: 0, totalFiles: 0, maxUser: { user: '', fileCount: 0 },
    };
    const files = fs.readdirSync(path.resolve(__dirname, '../database/drives'));

    const userFileLengths = [];

    for (let i = 0; i < files.length; i++) {
      const folder = files[i];
      try {
        const size = fs.readdirSync(path.resolve(__dirname, `../database/drives/${folder}`)).length;
        const userFileLength = { username: folder, totalFilesPresent: size };
        if (size > data.maxUser.fileCount) {
          data.maxUser.fileCount = size;
          data.maxUser.user = folder;
        }
        data.totalFiles += size;
        data.totalUsers++;
        data.totalFolders++;
        userFileLengths.push(userFileLength);
      } catch (err) {
        if (err.code === 'ENOENT') resJson.statusCode = 404;
        else resJson.statusCode = 500;
        resJson.message = err.message;
        res.writeHead(resJson.statusCode);
        res.write(resJson.message);
        res.end();
        break;
      }
    }

    resJson.statusCode = 200;
    resJson.data = data;
    res.writeHead(resJson.statusCode);
    res.write(JSON.stringify(resJson.data));
    res.end();
    return resJson;
  };

  return { readStats };
};

module.exports = statsController;
