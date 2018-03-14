require('dotenv').config()

const fastify = require('fastify')()
const api = require('./modules/api');
const path = require('path')
const serveStatic = require('serve-static')

fastify.get('/api/search/:search', async (request, reply) => {
  const result = await api.searchShow(request.params.search)
  
  reply.send(result)
})

fastify.get('/api/show/:id', async (request, reply) => {
  const show = await api.getSeasons(request.params.id)
  
  reply.send(show)
})

if (process.env.ENV === 'development') {
  fastify.register(require('fastify-http-proxy'), {
    upstream: 'http://localhost:3000'
  })
} else {
  fastify.use('/', serveStatic(path.join(__dirname, '/build')))
}

fastify.listen(process.env.SERVER_PORT, '127.0.0.1', function (err) {
  if (err) throw err
  console.log(`server listening on http://${fastify.server.address().address}:${fastify.server.address().port}`)
})