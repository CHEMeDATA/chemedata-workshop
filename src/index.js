// example copied from https://www.npmjs.com/package/fastify

import { writeFileSync } from 'fs';
import { join } from 'path';

import fastify from 'fastify';
import fastifyStatic from 'fastify-static';

const server = fastify({
  logger: true,
});

server.register(fastifyStatic, {
  root: join(__dirname, 'html'),
  // prefix: '/html/', // default '/'
});

server.post('/save', async (request, reply) => {
  //console.log(request.body);
  writeFileSync(
    join(__dirname, 'html/data.json'),
    JSON.stringify(request.body, undefined, 2),
    'utf8',
  );
  reply.send({ hello: 'world' });
});

server.listen(3000, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  server.log.info(`server listening on ${address}`);
});
