const express = require('express');
const router = express.Router();


//if you add code after the initial response you need to RETURN the first response
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'orders were fetched'
    })
})

router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message: 'orders were created',
        order: order
    })
})


router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'orders were created',
        orderId: req.params.orderId
    })
})

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'orders were deleted',
    })
})


module.exports = router;