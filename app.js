const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const cors = require('cors');

const Item = require('./models/Items');

const app = express();

const itemsRoute = require('./routs/items');

//middleware::::::::::::::::

// cors for cross domain access
app.use(cors());

// making iploads folder publically avaliable for accessing images easily
app.use('/uploads', express.static('uploads'));

// parsing data to jason formate
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use('/items', itemsRoute);

// getting all data from items
app.get('/', (req, res) => {
    Item.find().then((data) => {
        res.json(data);
    });
});

// connecting to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to db');
});

// starting server
app.listen(4000, () => console.log('listining to 4000'));

//mongodb+srv://faraz:<password>@cluster0.6emix.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
