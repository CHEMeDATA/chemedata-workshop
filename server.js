// example copied from https://www.npmjs.com/package/fastify
let fs = require('fs');
let path = require('path');
let fastify = require('fastify');

let http = require('http');
let url = require('url');

let serverfastify = fastify({
  logger: false,
});

serverfastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'html'),
});

serverfastify.get('/html', function (req, reply) {
  reply.sendFile('page1.html'); // serving path.join(__dirname, 'public', 'myHtml.html') directly
});

serverfastify.listen(8080, (err, address) => {
  if (err) throw err;
  serverfastify.log.info(`server listening on... ${address}`);
});