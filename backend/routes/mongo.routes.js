module.exports = app => {
  const mongo = require("../database/mongodb/controllers/mongo.controller.js")

  var router = require("express").Router()

  // Create a new Tutorial
  router.post("/", mongo.create)

  // Retrieve all Tutorials
  router.get("/", mongo.findAll)

  // Retrieve all published Tutorials
  router.get("/published", mongo.findAllPublished)

  // Retrieve a single Tutorial with id
  router.get("/:id", mongo.findOne)

  // Update a Tutorial with id
  router.put("/:id", mongo.update)

  // Delete a Tutorial with id
  router.delete("/:id", mongo.delete)

  // Delete all Tutorial
  router.delete("/", mongo.deleteAll)

  app.use("/api/tutorials", router)
}