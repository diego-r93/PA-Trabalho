const express = require('express')
const cors = require("cors")

const path = require('path')
const app = express()

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app')
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore')

const credentials = require('./key.json')

initializeApp({
  credential: cert(credentials)
})

const firestoreDB = getFirestore()

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 8081

const corsOptions = {
  origin: "http://localhost:8081"
}

app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

const db = require("./models")
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

app.post('/create', async (req, res) => {
  try {
    const id = req.body.email
    const userJson = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    }
    const response =  firestoreDB.collection('users').doc(id).set(userJson)
    res.send(response)
  }
  catch(error) {
    res.send(error)
  }
})

app.get('/', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, './dist/index.html'))
})

app.get('*', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, './dist/index.html'))
})

require("./routes/tutorial.routes")(app)

// Listen the server
app.listen(port, host, () => {
  console.log('Server listening on ' + host + ':' + port)
})