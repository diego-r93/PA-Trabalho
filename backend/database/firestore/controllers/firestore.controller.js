const db = require("../models")

exports.create = async (req, res) => {
  try {
    const id = req.body.email
    const userJson = {
      email: req.body.email,
      firstName: req.body.firstName || "",
      lastName: req.body.lastName || ""
    }

    const response = db.firestoreDB.collection('users').doc(id)
    await response.set(userJson)
    res.send('Usuário criado com sucesso!')
  } catch (error) {
    console.error('Erro ao criar o usuário:', error)
    res.status(500).send('Erro ao criar o usuário.')
  }
}

exports.findAll = async (req, res) => {
  try {
    const usersRef = db.firestoreDB.collection('users')
    const response = await usersRef.get()
    let responseArr = []
    response.forEach(doc => {
      responseArr.push(doc.data())
    })
    res.send(responseArr)
  } catch (error) {
    console.error('Erro ao criar o usuário:', error)
    res.status(500).send('Erro ao criar o usuário.')
  }
}

exports.findOne = async (req, res) => {
  try {
    const usersRef = db.firestoreDB.collection('users').doc(req.params.id)
    const response = await usersRef.get()
    res.send(response.data())
  } catch (error) {
    console.error('Erro ao criar o usuário:', error)
    res.status(500).send('Erro ao criar o usuário.')
  }
}

exports.update = async (req, res) => {
  try {    
    const userJson = {
      firstName: req.body.firstName,
      lastName: req.body.lastName
    }
    const usersRef = db.firestoreDB.collection('users').doc(req.params.id)
    const response = await usersRef.update(userJson)
    res.send(response)
  } catch (error) {
    console.error('Erro ao criar o usuário:', error)
    res.status(500).send('Erro ao criar o usuário.')
  }
}

exports.delete = async (req, res) => {
  try {    
    const usersRef = db.firestoreDB.collection('users').doc(req.params.id)
    const response = await usersRef.delete()
    res.send(response)
  } catch (error) {
    console.error('Erro ao criar o usuário:', error)
    res.status(500).send('Erro ao criar o usuário.')
  }
}