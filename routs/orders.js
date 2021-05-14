const express = require('express');

const Order = require('../models/Order');
const router = express.Router();
const auth = require('../middleWare/auth');


router.post('/checkout',auth, (req, res, next) => {
    const order = new Order({
        name: req.body.name,
        userName: req.body.userName,
        total: req.body.total,
        quantity: req.body.quantity,
    });

    order
        .save()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => {
            res.status(400).json({ message: error });
        });
});

module.exports = router;
