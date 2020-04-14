// example copied from https://www.npmjs.com/package/fastify
let fs = require('fs');
let path = require('path');

let fastify = require('fastify');
let fastifyStatic = require('fastify-static');

let server = fastify({
  logger: true,
});

server.register(fastifyStatic, {
  root: path.join(__dirname, 'src/html'),
});

server.post('/save', async (request, reply) => {
  fs.writeFileSync(
    path.join(__dirname, 'src/html/data.json'),
    JSON.stringify(request.body, undefined, 2),
    'utf8',
  );
  reply.send({ hello: 'world' });
});

server.listen(8080, (err, address) => {
  if (err) throw err;
  server.log.info(`server listening on... ${address}`);
});
