module.exports = app => {
  // const users = require("../database/firestore/controllers/firestore.controller.js")
  const users = require("../database/mongodb/controllers/users.controller.js");
  const { verifyToken } = require('../database/mongodb/controllers/token.controller.js');

  var router = require("express").Router()

  router.post('/', users.createWithFirebaseAndMongo)

  router.post('/login', users.loginWithFirebase)

  router.get('/', users.findAll)

  router.get("/:id", users.findOne)

  router.put("/:id", verifyToken, users.update)

  // router.delete("/:id", users.delete)

  app.use("/api/users", router)
}