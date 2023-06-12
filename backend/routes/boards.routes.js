module.exports = app => {
  const board = require("../database/mongodb/controllers/board.controller.js")

  var router = require("express").Router()

  // Create a new Tutorial
  router.post("/", board.create)

  // Retrieve all Tutorials
  router.get("/", board.findAll)

  // Retrieve all published Tutorials
  router.get("/published", board.findAllPublished)

  // Retrieve a single Tutorial with id
  router.get("/:id", board.findOne)

  // Update a Tutorial with id
  router.put("/:id", board.update)

  // Delete a Tutorial with id
  router.delete("/:id", board.delete)

  // Delete all Tutorial
  router.delete("/", board.deleteAll)

  app.use("/api/boards", router)
}