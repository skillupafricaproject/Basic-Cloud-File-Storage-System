const fs = require('fs');
const http = require('http');
const port = 4000;
const server = http.createServer(function (req, res) {
  const responseJson = {};
  if (req.url == '/register') {
    let data;
    req.on('data', chunk => {
      data = chunk;
    })
    req.on('end', () => {
      var body = JSON.parse(data);
      console.dir(body);
      var username = body.username;
      if (!fs.existsSync(username)) {
        fs.mkdirSync(username);
        responseJson['message'] = "Success";
      } else {
        responseJson['error'] = "Already exists";
      }
      res.write(JSON.stringify(responseJson));
      res.end();
    });
  }
});
server.listen(port, () => {
  console.log(`server running`)
});
