const express = require('express')
const app = express()

const path = require('path')

const cors = require("cors")
const corsOptions = {
  origin: "http://localhost:7500"
}
app.use(cors(corsOptions))

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 8081

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

const db = require("./database/mongodb/models")
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!")
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err)
    process.exit()
  })

// Serve Vue.js as SPA in production
app.use(express.static('dist'))

app.get('/', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, './dist/index.html'))
})

// app.get('*', (req, res, next) => {
//   res.sendFile(path.resolve(__dirname, './dist/index.html'))
// })

require("./routes/mongo.routes")(app)

require("./routes/firestore.routes")(app)

// Listen the server
app.listen(port, host, () => {
  console.log('Server listening on ' + host + ':' + port)
})