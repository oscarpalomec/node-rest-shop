
const express = require("express");
//To handle different routes
const router = express.Router();

const Product = require("../models/product");

const mongoose = require("mongoose");

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb){

  },
  filename: function(req, file, cb){
    
  }
});
const upload = multer({dest: 'uploads/'})

router.get("/", (req, res, next) => {
  Product.find()
  .select('name author editorial genre price _id')
  .exec()
  .then(docs => {
    console.log(docs)
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            name:doc.name,
            author: doc.author,
            editorial: doc.editorial,
            genre: doc.genre,
            price:doc.price,
            _id: doc._id,
            request: {
              type: 'GET',
              url: 'http://localhost:3000/products/' + doc._id
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

router.post("/",upload.single('productImage'),  (req, res, next) => {
  console.log(req.file);
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    author: req.body.author,
    editorial: req.body.editorial,
    genre: req.body.genre,
    price: req.body.price
  });
  product
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Producto creado exitosamente",
        createdProduct: {
          name: result.name,
          author: result.author,
          editorial: result.editorial,
          genre: result.genre,
          price: result.price,
          _id: result._id,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/products/' + result._id
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

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
  .select('name author editorial genre price _id')
  .exec()
  .then(doc => {
      console.log("De la base det datos, ",doc);
      if (doc){
        res.status(200).json({
          product: doc,
          request: {
            type: 'GET',
            description: 'Consulta todos los productos',
            url: 'http://localhost/products'
          }
        });
      }else {
          res.status(404).json({message: 'No se encontró'})
      }
      
  })
  .catch(err => {
     console.log(err)
     res.status(500).json({error: err});
  });
});

router.patch("/:productId", (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
  Product.updateOne({_id: id}, {$set: updateOps})
  .exec()
  .then(result => {
      res.status(200).json({
        message: "Producto actualizado",
        request: {
          type: 'GET',
          url: 'http://localhost:3000/products/' + id
        }
      })
  })
  .catch(err => {
      console.log(err)
      res.status(500).json({
          error: err
      });
    });
});

router.delete("/:productId", (req, res, next) => {
    const id = req.params.productId;
  Product.remove({_id: id})
  .exec()
  .then(result=> {
      res.status(200).json({
        message: 'Producto eliminado',
        request: {
          type: 'POST',
          url: 'http://localhost:3000/products',
          body: {name: 'String', price: 'Number'}
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
