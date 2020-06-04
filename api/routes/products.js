const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const mongoose = require('mongoose');
//if you add code after the initial response you need to RETURN the first response
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'handling get reuqest to /products'
    })
})

router.post('/', (req, res, next) => {

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    //exec turns this into a promise
    product.save().then(result => {
        console.log(result)
    }).catch(err => console.log(err));
    res.status(201).json({
        message: 'handling POST reuqest to /products',
        createdProduct: product
    })
})


router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;

    if (id === 'special') {
        res.status(200).json({
            message: 'you discovered the special Id',
            id: id
        })
    } else {
        res.status(200).json({
            message: 'not the special Id'
        })
    }
})

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'updated product'
    })
})

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'deleted product'
    })
})
module.exports = router;