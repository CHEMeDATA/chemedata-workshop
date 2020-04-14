// example copied from https://www.npmjs.com/package/fastify
let fs = require('fs');
let path = require('path');

let http = require('http');
let url = require('url');

let fastify = require('fastify');

let server = fastify({
  logger: false,
});

server.register(require('fastify-static'), {
  root: path.join(__dirname, 'html'),
});

server.get('/html', function (req, reply) {
  reply.sendFile('page1.html'); // serving path.join(__dirname, 'public', 'myHtml.html') directly
});

server.listen(8080, (err, address) => {
  if (err) throw err;
});
