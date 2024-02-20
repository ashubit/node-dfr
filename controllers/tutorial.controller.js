const db = require("../models");
const Tutorial = db.tutorials;

// Create and Save a new Tutorial
exports.create = (req, res) => {
        // Validate request
        if (!req.body.title) {
          res.status(400).send({ message: "Content can not be empty!" });
          return;
        }
      
        // Create a Tutorial
        const tutorial = new Tutorial({
          title: req.body.title,
          email: req.body.email,
          password: req.body.password,
          description: req.body.description,
          published: req.body.published ? req.body.published : false
        });
      
        // Save Tutorial in the database
        tutorial
          .save(tutorial)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Tutorial."
            });
          });
    
};

// Update a Tutorial using id
exports.update = (req, res) => {

  const id = req.params.id;
  console.log(req.body);
  // Validate request
  if (!id && req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const myquery = { _id: id };
  const newvalues = {$set: req.body };

  // Save Tutorial in the database
  Tutorial.updateOne(myquery,newvalues)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });

};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Tutorial.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };

// Login Tutorial with an email and pwd
exports.login = (req, res) => {
  const password = req.body.password;
  const email = req.body.email;
  const condition = {email:email, password:password};

  Tutorial.find(condition)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Tutorial with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + id });
    });
};

  // Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Tutorial.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Tutorial with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Tutorial with id=" + id });
      });
  };


// Delete a single Tutorial with an id
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.deleteOne({'_id':id})
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Tutorial with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + id });
    });
};