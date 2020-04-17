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

server.post('/cdxml2mol', async (request, reply) => {
  fs.writeFileSync(
    path.join(__dirname, 'html/data/cdxml2mol_input.cdxml'),
    request.body,
    'utf8',
  );
  await openBabelToSdf('html/data/cdxml2mol_input.cdxml');
  const stream = fs.createReadStream(
    'html/data/cdxml2mol_input.cdxml.sdf',
    'utf8',
  );
  reply.send(stream);
});

server.post('/saveUpload', async (request, reply) => {
  //console.log(`****************server get saveUpload on... ${request}`);
  fs.writeFileSync(
    path.join(__dirname, 'html/data/dataUpload.txt'),
    request.body,
    'utf8',
  );
  reply.send({ hello: 'world saveUpload' });
});

server.post('/save', async (request, reply) => {
  fs.writeFileSync(
    path.join(__dirname, 'html/data/data.json'),
    JSON.stringify(request.body, undefined, 2),
    'utf8',
  );
  reply.send({ hello: 'world save' });
});

server.post('/saveCopy', async (request, reply) => {
  fs.writeFileSync(
    path.join(__dirname, 'html/data/data_copy.json'),
    JSON.stringify(request.body, undefined, 2),
    'utf8',
  );
  reply.send({ hello: 'world' });
});

server.listen({ port: 8080, host: '0.0.0.0' }, (err, address) => {
  if (err) throw err;
  server.log.info(`server listening on... ${address}`);
});

function openBabelToSdf(arg) {
  const exec = require('child_process').exec;
  return new Promise((resolve, reject) => {
    let cmdf = `obabel ${arg} -o sdf -O ${arg}.sdf`;
    exec(cmdf, (error, stdout, stderr) => {
      if (error) {
        server.log.err(error);
      }
      resolve(stdout ? stdout : stderr);
    });
  });
}
