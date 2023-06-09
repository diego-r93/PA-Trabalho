const express = require('express')
const path = require('path')

const app = express()

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3050

// Serve Vue.js as SPA in production
app.use(express.static('dist'))

app.get('/', (req, res, next) => {
  res.sendFile('index.html', { 'root': path.join(__dirname, '../dist') })
})

// Listen the server
app.listen(port, host, () => {
  console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
})