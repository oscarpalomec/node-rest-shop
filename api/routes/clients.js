const express = require("express");
//To handle different routes
const router = express.Router();

const Client = require("../models/client");

const mongoose = require("mongoose");


router.get("/", (req, res, next) => {
    Client.find()
    .select('name paternoLastName maternoLastName email phone _id')
    .exec()
    .then(docs => {
      console.log(docs)
        const response = {
          count: docs.length,
          clients: docs.map(doc => {
            return {
              name:doc.name,
              paternoLastName: doc.paternoLastName,
              maternoLastName:doc.maternoLastName,
              email: doc.email,
              phone: doc.phone,
              _id: doc._id,
              request: {
                type: 'GET',
                url: 'http://localhost:3000/clients/' + doc._id
              }
            }
          })
        }
       // if(docs.length >= 0){
          res.status(200).json(response);
        //}else {
          //  res.status(404).json({
          //      message: 'No se encontaron entradas'
         //   });
       // }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
    });
  });

  router.post("/", (req, res, next) => {
    console.log(req.file);
    const client = new Client({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      paternoLastName: req.body.paternoLastName,
      maternoLastName: req.body.maternoLastName,
      email: req.body.email,
      phone: req.body.phone
    });
    client
      .save()
      .then((result) => {
        console.log(result);
        res.status(201).json({
          message: "Cliente creado exitosamente",
          createdClient: {
            name: result.name,
            paternoLastName: result.body.paternoLastName,
            maternoLastName: result.body.maternoLastName,
            email: result.body.email,
            phone: result.author,
            _id: result._id,
            request: {
              type: 'GET',
              url: 'http://localhost:3000/clients/' + result._id
            }
          }
        });
      })
      .catch((err) => {
          console.log(err);
          res.status(500).json({
              error: err
          });
      });
    
  });

  router.delete("/:clientId", (req, res, next) => {
    const id = req.params.clientId;
  Client.remove({_id: id})
  .exec()
  .then(result=> {
      res.status(200).json({
        message: 'Cliente eliminado',
        request: {
          type: 'POST',
          url: 'http://localhost:3000/products',
          body: {name: 'String', paternoLastName: 'String', maternoLastName: 'String', email: 'String', phone: 'String'}
        }
      })
  })
  .catch(err => {
      console.log(err);
      res.status(500).json({
          error: err
      });
  });
});


module.exports = router;