const express = require('express');
const router = express.Router();


//if you add code after the initial response you need to RETURN the first response
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'handling get reuqest to /products'
    })
})

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'handling post reuqest to /products'
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