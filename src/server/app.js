const express = require('express')
const routes = require('./routes')

module.exports = ({ config }) => {
  const app = express()
  
  app.use(routes({ config }))

  return app
}
