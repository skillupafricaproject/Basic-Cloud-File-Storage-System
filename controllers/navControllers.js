const navController = (fs, path, req, res) => {
  const navigate = (route) => {
    const { hostname } = route;
    const resJson = {};
    const data = [
      {
        url: '/users',
        methods: [
          {
            POST: {
              route: `${hostname}/users`,
              desc: 'Register new user',
            },
          },
        ],
      },
      {
        url: '/files',
        methods: [
          {
            GET: {
              route: `${hostname}/files/?username=tboyak&fileId=1`,
              desc: 'Read a file',
            },
          },
          {
            POST: {
              route: `${hostname}/files/?username=tboyak`,
              desc: 'Create new file',
            },
          },
          {
            PUT: {
              route: `${hostname}/files/?username=tboyak&fileId=1`,
              desc: 'Update file',
            },
          },
          {
            DELETE: {
              route: `${hostname}/files/?username=tboyak&fileId=1`,
              desc: 'Delete file',
            },
          },
        ],
      },
      {
        url: '/stats',
        methods: [
          {
            GET: {
              route: `${hostname}/stats`,
              desc: 'Read server content details',
            },
          },
        ],
      },
    ];

    resJson.statusCode = 200;
    resJson.data = data;
    res.writeHead(resJson.statusCode);
    res.write(JSON.stringify(resJson.data));
    res.end();
    return resJson;
  };

  return { navigate };
};

module.exports = navController;
