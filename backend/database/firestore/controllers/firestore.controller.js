const db = require("../models")

exports.create = async (req, res) => {
  try {
    const id = req.body.email
    const userJson = {
      email: req.body.email,
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
    console.error('Erro ao buscar o usuário:', error)
    res.status(500).send('Erro ao buscar o usuário.')
  }
}

exports.update = async (req, res) => {
  try {    
    const userJson = req.body; // O objeto JSON completo enviado na solicitação
    const usersRef = db.firestoreDB.collection('users').doc(req.params.id);
    const response = await usersRef.update(userJson);
    res.send(response);
  } catch (error) {
    console.error('Erro ao editar o usuário:', error);
    res.status(500).send('Erro ao editar o usuário.');
  }
}

exports.delete = async (req, res) => {
  try {    
    const usersRef = db.firestoreDB.collection('users').doc(req.params.id)
    const response = await usersRef.delete()
    res.send(response)
  } catch (error) {
    console.error('Erro ao excluir o usuário:', error)
    res.status(500).send('Erro ao excluir o usuário.')
  }
}