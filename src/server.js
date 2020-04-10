// example copied from https://www.npmjs.com/package/fastify

import fs from 'fs';
import { path } from 'path';

import fastify from 'fastify';
import fastifyStatic from 'fastify-static';

const server = fastify({
  logger: true,
});

server.register(fastifyStatic, {
  root: path.join(__dirname, 'html'),
});

server.post('/save', async (request, reply) => {
  fs.writeFileSync(
    path.join(__dirname, 'html/data.json'),
    JSON.stringify(request.body, undefined, 2),
    'utf8',
  );
  reply.send({ hello: 'world' });
});

server.listen(8080, (err, address) => {
  if (err) throw err;
  server.log.info(`server listening on ${address}`);
});
