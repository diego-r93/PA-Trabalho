const jwt = require('jsonwebtoken');
const db = require("../models");
const User = db.user;

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({ message: 'Token not provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).send({ message: 'Invalid token' });
    }

    User.findById(decodedToken.userId)
        .then(user => {
            // Encontra o usuário e o encaminha para a próxima função da API
            req.userData = user;
            next();
        }).catch(err => {
            console.log(err.message)
            res.status(500).send({
                message: err.message || "Some error occurred while validating token."
            });
        })


  });
};