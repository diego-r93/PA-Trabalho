module.exports = app => {
  const firestore = require("../database/firestore/controllers/firestore.controller.js")

  var router = require("express").Router()

  router.post('/create', firestore.create)

  app.use("/users", router)
}