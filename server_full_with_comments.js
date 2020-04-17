// example copied from https://www.npmjs.com/package/fastify
let fs = require('fs');
let path = require('path');

//let bac = require('basic-auth-connect');//?
//let corshere = require('cors');
let fastify = require('fastify');
//let fastifyreplyfrom = require('fastify-reply-from');
let fastifyStatic = require('fastify-static');
//let kfastifygateway = require('k-fastify-gateway'); // not nicely installed...

let server = fastify({
  logger: true,
});
/*

/// api part from https://github.com/jkyberneees/fastify-gateway
// required plugin for HTTP requests proxy
server.register(fastifyreplyfrom);

// gateway plugin
server.register(kfastifygateway, {
  middlewares: [corshere()],

  routes: [
    {
      prefix: '/public',
      prefixRewrite: '',
      target: 'http://localhost:3000',
      middlewares: [],
      hooks: {
        async onRequest(req, reply) {
          //   // we can optionally reply from here if required
          //   reply.send('Hello World!')
          //
          //   return true // truthy value returned will abort the request forwarding
        },
        onResponse(req, reply, res) {
          // do some post-processing here
          // ...
          // forward response to origin client once finished
          reply.send(res);
        },
        // other options allowed https://github.com/fastify/fastify-reply-from#replyfromsource-opts
      },
    },
    {
      prefix: '/admin',
      target: 'http://localhost:3001',
      middlewares: [bac('admin', '-pass')],
    },
    {
      prefix: '/user',
      target: 'http://localhost:3001',
    },
  ],
});
//end api part
*/

server.register(fastifyStatic, {
  root: path.join(__dirname, 'html'),
});

/*
server.get('html/data', async function (req, reply) {
  reply.sendFile('data_copy.json'); // serving path.join(__dirname, 'public', 'myHtml.html') directly
});
*/
server.post('/saveUpload', async (request, reply) => {
  //console.log(`****************server get saveUpload on... ${request}`);
  fs.writeFileSync(
    path.join(__dirname, 'html/data/dataUpload.txt'),
    request.body,
    'utf8',
  );
  reply.send({ hello: 'world saveUpload' });
});

server.post('/cdxml2mol', async (request, reply) => {
  //console.log(`****************server get cdxml2mol on... ${request}`);
  await fs.writeFileSync(
    path.join(__dirname, 'html/data/cdxml2mol_input.cdxml'),
    request.body,
    'utf8',
  );
  await openBabelToSdf('html/data/cdxml2mol_input.cdxml');
  /* //this is working but not really controled end-of-line with /n...
  let fileout = await fs.readFileSync(
    path.join(__dirname, 'html/data/cdxml2mol_input.cdxml.sdf'),
    request.body,
    'utf8',
  );
  const stream = fs.createReadStream('some-file', 'utf8')
  reply.send(fileout);
  //
  */
  const stream = fs.createReadStream(
    'html/data/cdxml2mol_input.cdxml.sdf',
    'utf8',
  );
  reply.send(stream);
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
