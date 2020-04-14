// example copied from https://www.npmjs.com/package/fastify
let fs = require('fs');
let path = require('path');

let fastify = require('fastify');
let fastifyStatic = require('fastify-static');

let server = fastify({
  logger: true,
});

server.register(fastifyStatic, {
  root: path.join(__dirname, 'html'),
});

server.get('/html', function (req, reply) {
  reply.sendFile('page1.html'); // serving path.join(__dirname, 'public', 'myHtml.html') directly
});

server.listen(8080, (err, address) => {
  if (err) throw err;
  server.log.info(`server listening on... ${address}`);
});
