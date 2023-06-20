module.exports = app => {
  const board = require("../database/mongodb/controllers/board.controller.js")
  const { verifyToken } = require('../database/mongodb/controllers/token.controller.js'); //Mudar local

  var router = require("express").Router()

  // Create a new Board
  router.post("/", verifyToken, board.create)

  // Retrieve all Boards
  router.get("/", verifyToken, board.findAll)

  // Retrieve a single Board with id
  router.get("/:id", verifyToken, board.findOne)

  // Update a Board with id
  router.put("/:id", verifyToken, board.update)

  // Delete a Board with id
  router.delete("/:id", verifyToken, board.delete)

  // Delete all Board
  // router.delete("/", verifyToken, board.deleteAll)

  app.use("/api/boards", router)
}