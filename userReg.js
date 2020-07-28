const fs = require('fs');
const http = require('http');
const path = require('path');

const server = http.createServer((req, res) => {
  const responseJson = {};
  if (req.url == '/register') {
    // Handle POST request
    let data;
    req.on('data', chunk => {
      data = chunk;
    })
    req.on('end', () => {
      let body = JSON.parse(data);
      console.dir(body);
      const username = body.username;
      fs.mkdir(path.join(__dirname, username), (err) => {
        if (err) {
          responseJson['error'] = "Already exists";
          console.log(responseJson);
        } else {
          responseJson['message'] = "Success";
          console.log(responseJson);
        }
        res.write(JSON.stringify(responseJson));
        res.end();
      });
    });
  }
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});
