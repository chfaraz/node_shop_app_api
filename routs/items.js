const express = require('express');
const multer = require('multer');

// pre workout for storing files and images with multer

const storage = multer.diskStorage({
    description: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString + file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 3,
    },
    fileFilter: fileFilter,
});

//requiring Item model from models

const Item = require('../models/Items');

const router = express.Router();

// posting data to mongodb with mongoose

router.post('/', upload.single('image'), (req, res) => {
    const item = new Item({
        title: req.body.title,
        description: req.body.description,
        quantity: req.body.quantity,
        price: req.body.price,
        catagory: req.body.catagory,
        image: req.file.path,
    });
    item.save()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => {
            res.status(400).json({ message: error });
        });
});

// updating route

router.patch('/:itemId', (req, res) => {
    Item.updateOne(
        { _id: req.params.itemId },
        {
            $set: {
                title: req.body.title,
                description: req.body.description,
                quantity: req.body.quantity,
                price: req.body.price,
                catagory: req.body.catagory,
            },
        }
    )
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => {
            res.status(400).json({ message: error });
        });
});

// route to delete a specific item

router.delete('/:itemId', (req, res) => {
    Item.remove({ _id: req.params.itemId })
        .then(() => res.json('deleted'))
        .catch((err) => res.json(err));
});

module.exports = router;
