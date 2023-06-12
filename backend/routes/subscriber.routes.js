module.exports = app => {
  const publisherController = require('../mqtt/controllers/subscriber.controller')

  var router = require("express").Router()

  router.get("/", publisherController.subscribeMQTTMessage)

  app.use("/mqtt", router)
}