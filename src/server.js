let fs = require('fs');
let path = require('path');

let fastify = require('fastify');
let fastifyStatic = require('fastify-static');

const server = fastify({
  logger: true,
});

server.register(fastifyStatic, {
  root: path.join(__dirname, 'html'),
  // prefix: '/html/', // default '/'
});

server.post('/save', async (request, reply) => {
  //console.log(request.body);
  fs.writeFileSync(
    path.join(__dirname, 'html/data.json'),
    JSON.stringify(request.body, undefined, 2),
    'utf8',
  );
  reply.send({ hello: 'world' });
});

server.listen(3000, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  server.log.info(`server listening on ${address}`);
});
