const express = require('express');
const bcrypt = require('bcrypt-nodejs');
require('dotenv/config');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const router = express.Router();

router.post('/signup', (req, res, next) => {
    User.find({ userName: req.body.userName }).then((user) => {
        if (user.length >= 1) {
            res.status(409).json({ message: 'user name taken' });
            console.log(user);
        } else {
            const user = new User({
                name: req.body.name,
                userName: req.body.userName,
                password: req.body.password,
            });

            user.save()
                .then((data) => {
                    res.status(200).json(data);
                })
                .catch((error) => {
                    res.status(400).json({ message: error });
                });
        }
    });
});

router.post('/login', (req, res, next) => {
    User.find({ userName: req.body.userName }).then((user) => {
        if (user.length < 1) {
            return res.status(500).json({ message: 'failed...' });
        }
        if (user[0].password === req.body.password) {
            var token = jwt.sign({ userName: user[0].userName, type: user[0].type }, process.env.JWT_KEY);
            return res.status(200).json({ message: 'success', token: token });
        } else {
            return res.status(500).json({ message: 'failed...' });
        }
    });
});
module.exports = router;
