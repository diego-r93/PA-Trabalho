module.exports = app => {
  const publisherController = require('../mqtt/controllers/mqtt.controller')

  var router = require("express").Router()

  router.get("/", publisherController.subscribeMQTTMessage)

  router.post("/", publisherController.publishMQTTMessage)

  router.patch("/:id", publisherController.updateGPIO)

  router.get("/getdevices", publisherController.getDevices)

  app.use("/mqtt", router)
}