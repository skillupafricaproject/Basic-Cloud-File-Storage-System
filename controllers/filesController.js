const filesController = (fs, path, req, res) => {
  const readFile = (route) => {
    const { fileId, username } = route.query;

    try {
      const dataBuffer = fs.readFileSync(
        path.resolve(__dirname, `../database/drives/${username}/${fileId}.txt`)
      );
      const fileContent = dataBuffer.toString();

      const resJson = {
        statusCode: 200,
        data: {
          file: {
            id: `${fileId}.txt`,
            content: fileContent,
          }
        }
      };

      res.writeHead(resJson.statusCode);
      res.write(JSON.stringify(resJson.data));
      res.end();
      return resJson;
    } catch (err) {
      if (err.code === 'ENOENT') {
        const resJson = {
          statusCode: 404,
          message: err.message
        };

        res.writeHead(resJson.statusCode);
        res.write(resJson.message);
        res.end();
        return resJson;
      }

      const resJson = {
        statusCode: 500,
        message: err.message
      };

      res.writeHead(resJson.statusCode);
      res.write(resJson.message);
      res.end();
      return resJson;
    }
  };

  const createNewFile = () => { };
  const updateFile = (route) => { };

  const deleteFile = (route) => {
    const { fileId, username } = route.query;

    try {
      fs.unlinkSync(path.resolve(__dirname, `../database/drives/${username}/${fileId}.txt`));

      const resJson = {
        statusCode: 200,
        message: `File ${fileId}.txt deleted successfully`
      };

      res.writeHead(resJson.statusCode);
      res.end(resJson.message);
      return resJson;
    } catch (err) {
      if (err.code === 'ENOENT') {
        const resJson = {
          statusCode: 404,
          message: err.message
        };

        res.writeHead(resJson.statusCode);
        res.end(resJson.message);
        return resJson;
      }

      const resJson = {
        statusCode: 500,
        message: err.message
      };

      res.writeHead(resJson.statusCode);
      res.end(resJson.message);
      return resJson;
    }
  };

  return { readFile, createNewFile, updateFile, deleteFile };
}

module.exports = filesController;
