const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const mongoose = require('mongoose');
//if you add code after the initial response you need to RETURN the first response
router.get('/', (req, res, next) => {
    //find is a static method you can call to retrieve ALL the data from a particualr db
    Product.find()
        .select('name price _id')
        .exec().then(
            docs => {
                const response = {
                    count: docs.length,
                    products: docs.map(doc => {
                        return {
                            name: doc.name,
                            price: doc.price,
                            _id: doc._id,
                            request: {
                                type: 'GET',
                                url: 'http://localhost:3000/products/' + doc._id
                            }
                        }
                    })
                }
                res.status(200).json(response)
            }
        ).catch(err => {
            res.status(500).json({
                error: err
            })
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
        res.status(201).json({
            message: 'success',
            createdProduct: {
                name: result.name,
                price: result.price,
                _id: result._id,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/products/' + result._id
                }
            }
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({ error: err })
    })


})


router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    //find is a static method you can call to retrieve a single piece of data back
    Product.findById(id)
        .select('name price _id').exec().then(
            doc => {
                if (doc) {
                    const response = {
                        name: doc.name,
                        price: doc.price,
                        id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/products/' + doc._id
                        }
                    }
                    res.status(200).json(response)
                } else {
                    res.status(404).json({ message: 'not a valid id' })
                }

            }
        ).catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        })
})

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    //iterate through the updates to create an obj and only edit the properties that are in the updateOps object
    //the user needs to know they HAVE to send in array with an object containing the property values they want to update
    for (const options of req.body) {
        updateOps[options.propName] = options.value;
    }
    //the first argument is the id to identify what you want to change, the second argument is the info to change
    Product.updateOne({ _id: id }, { $set: updateOps }).exec().then(result => {
        res.status(200).json({
            message: 'Product updated',
            url: 'http://localhost:3000/products/' + id
        })
    }).catch(err => {
        res.status(500).json({ error: err })
    })
})

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id }).exec().then(result => {
        res.status(200).json({
            message: 'product deleted',
            request: {
                type: 'DELETE',
                url: 'localhost:3000/products/' + id,
                body: {
                    name: 'String', price: 'Number'
                }
            }
        })
    }).catch(err => {
        res.status(500).json({ error: err })
    })
})
module.exports = router;