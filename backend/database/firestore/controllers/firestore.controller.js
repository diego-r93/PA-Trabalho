const db = require("../models")

exports.create = async (req, res) => {
    try {
      const id = req.body.email
      const userJson = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName
      }
  
      const docRef = db.firestoreDB.collection('users').doc(id)
      await docRef.set(userJson)
  
      res.send('Usuário criado com sucesso!')
    } catch (error) {
      console.error('Erro ao criar o usuário:', error)
      res.status(500).send('Erro ao criar o usuário.')
    }
  }