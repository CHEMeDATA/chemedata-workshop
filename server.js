const fastify = require('fastify')()

fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

const start =  () => {
  try {
     fastify.listen(8080)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
