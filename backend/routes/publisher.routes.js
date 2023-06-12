module.exports = app => {
  const publisherController = require('../mqtt/controllers/publisher.controller')

  var router = require("express").Router()

  router.post("/", publisherController.publishMQTTMessage)

  app.use("/mqtt", router)
}