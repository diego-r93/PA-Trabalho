module.exports = app => {
  const firestore = require("../database/firestore/controllers/firestore.controller.js")

  var router = require("express").Router()

  router.post('/', firestore.create)

  router.get('/', firestore.findAll)

  router.get("/:id", firestore.findOne)

  router.put("/:id", firestore.update)

  router.delete("/:id", firestore.delete)

  app.use("/users", router)
}