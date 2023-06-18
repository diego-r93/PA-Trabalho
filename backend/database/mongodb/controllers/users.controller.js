require('dotenv').config();
const db = require("../models");
const User = db.user;
const firebaseAuth = require("firebase/auth");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// Create and Save a new user
exports.create = (req, res) => {
  // Validate request
  if ((!req.body.email) || (!req.body.firstName) || (!req.body.lastName) || (!req.body.password))  {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  hashPassword(req.body.password).then(hashedPassword => {
    const user = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashedPassword,
      });
  
    user.save(user).then(data => {
      delete data.password
      res.send(data);
    })
    .catch(err => {
      console.log(err.message)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });


  }).catch(err => {
    console.log(err.message);
    res.status(500).send({ message: "Error hashing password" });
  });

  // const auth = firebaseAuth.getAuth();

  // firebaseAuth.createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
  //   .then((userCredential) => {
  //     // Create a User
  //     const mongoUser = new User({
  //       email: req.body.email,
  //       firstName: req.body.firstName,
  //       lastName: req.body.lastName,
  //       password: req.body.password,
  //       fbId: userCredential.user.uid,
  //     });

  //     mongoUser.save(mongoUser).then(data => {
  //         res.send(data);
  //       })
  //       .catch(err => {
  //         console.log(err.message)
  //         res.status(500).send({
  //           message:
  //             err.message || "Some error occurred while creating the User."
  //         });
  //       });
  //   })
  //   .catch(err => {
  //     console.log(err.message)
  //     res.status(500).send({
  //       message:
  //         err.message || "Some error occurred while creating the User."
  //     });
  //   })
};

// Login user with firebase
exports.loginWithFirebase = (req, res) => {
  // Validate request
  if ((!req.body.email) || (!req.body.password))  {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Login user with firebase
  const auth = firebaseAuth.getAuth();
    firebaseAuth.signInWithEmailAndPassword(auth, req.body.email, req.body.password)
      .then((userCredential) => {
        // verifica se existe o usuário na base de dados do mongo

        res.status(200).send(userCredential.user);
        return;
      })
      .catch(err => {
        console.log(err.message)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      });
};

// Login user
exports.login = (req, res) => {
  // Validate request
  if ((!req.body.email) || (!req.body.password))  {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const { email, password } = req.body

  // Encontrar o usuário no banco de dados
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      
      // Verificar a senha
      bcrypt.compare(password, user.password, (err, result) => {
        if (err || !result) {
          return res.status(401).send({ message: 'Invalid password' });
        }

        const response = user.toObject()

        // Gerar um token JWT
        response.accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        
        delete response.password
        // Enviar o token e outras informações do usuário como resposta
        res.status(200).send(response);
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error finding user' });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  User.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: `Not found User with id ${id}` });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: `Error retrieving User with id=${id}` });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;
  console.log('------------------------')
  console.log(req.userData)
  console.log('------------------------')
  if ((!req.userData._id) || (!id) || (id != req.userData._id)) {
    return res.status(403).send({message: 'Forbidden'});
  }

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      } else {
        res.send({
          message: "User was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delete User with id=${id}`
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Users were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    });
};

// Find all published Users
exports.findAllPublished = (req, res) => {
  User.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

function hashPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.log(err.message)
        reject(err);
      } else {
        resolve(hashedPassword);
      }
    });
  });
}