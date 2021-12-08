const express = require("express");

//To handle different routes
const router = express.Router();
const mongoose = require("mongoose");
const format = require("date-fns/format");




const Order = require("../models/order");
const Product = require("../models/product");
const Client = require("../models/client")


//Handle incoming GET requests to /orders
router.get("/", (req, res, next) => {
  Order.find()
  .select('product client createdAt quantity _id')
  .populate('client', 'name paternoLastName maternoLastName email')
  .populate('product','name price')
  .exec()
  .then(docs => {
      res.status(200).json({
        count: docs.length,
        orders: docs.map(doc => {
          return {
            _id: doc._id,
            client: doc.client,
            product: doc.product,
            quantity: doc.quantity,
            createdAt: format(doc.createdAt,'MM/dd/yyyy'),
            request : {
              type: 'GET',
              url: 'http//localhost:3000/orders/' + doc._id
            }
          }
        })
        
      });
  })
  .catch(err => {
      res.status(500).json({
          error: err
      });
  });
});

router.post("/", (req, res, next) => {
  Product.findById(req.body.productId)
    .then(product => {
      if (!product){
        return res.status(404).json({
          message: 'Producto no se encontró'
        })
      }
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        client: req.body.client,
        quantity: req.body.quantity,
        product: req.body.productId,
        createdAt: req.body.createdAt
      });
      return order.save()
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: 'Orden guardada',
        createdOrder: {
          _id: result._id,
          client: result.client,
          product: result.product,
          quantity: result.quantity,
          createdAt: req.body.createdAt
        },
        request: {
          type: 'GET',
          url: 'http//localhost:3000/orders/' + result._id
        }
      });
  })
  .catch(err => {
      console.log(err);
      res.status(500).json({
          error: err
      });
  });
  
});

router.get("/:orderId", (req, res, next) => {
  Order.findById(req.params.orderId)
  .populate('product')
  .exec()
  .then(order =>{
    if (!order){
      return res.status(404).json({
        message: 'Orden no encontrada'
      });
    }
    res.status(200).json({
      order: order,
      request: {
        type: 'GET',
        url: 'http:locaclhost:3000/orders'
      }
    });
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

router.delete("/:orderId", (req, res, next) => {
  Order.remove({_id: req.params.orderId})
  .exec()
  .then(result => {
    res.status(200).json({
      message: 'Orden eliminada',
      request: {
        type: 'POST',
        url: 'http:localhost:3000/orders',
        body: {productId: 'ID', quantity: 'Number'}
      }
    });
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

module.exports = router;
