const fastify = require('fastify')({ logger: false })
const fs = require('fs')
const cors = require('@fastify/cors')

// get reviews from a json file
const reviews = require('./reviews.json')

// bypassing CORS for local development
fastify.register(cors, {
  origin: '*',
})

fastify.get('/api/reviews', (req, res) => {
  res.send({ reviews })
})

fastify.post('/api/reviews', (req, res) => {
  const { body } = req

  // add a new review to the reviews array
  reviews.push(body)

  // save the reviews array to the json file
  fs.writeFile('./reviews.json', JSON.stringify(reviews), (err) => {
    if (err) {
      console.log(err)
    }
  })

  // send the updated reviews array back to the client
  res.send({ reviews })
})

fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
