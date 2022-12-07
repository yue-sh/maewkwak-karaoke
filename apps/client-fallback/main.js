import { readFile } from 'fs';
import { createServer } from 'http';

const host = 'localhost';
const port = 3001;

const httpServer = createServer(httpHandler);

httpServer.listen(port, host, () => {
  console.log(`HTTP server running at http://${host}:${port}/`);
});

function httpHandler(req, res) {
  readFile('./dist/' + req.url, function (err, data) {

    if (err == null) {

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
    }
  });
}
