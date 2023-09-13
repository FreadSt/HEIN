const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const logger = require('morgan');

const userRoutes = require('./routes/user');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const productRoutes = require('./routes/product');
const authRoutes = require('./routes/auth');
const stripeRoutes = require('./routes/stripe');
const MongoStore = require("connect-mongo");
const session = require("express-session");

dotenv.config();

const app = express();

app.use(logger('[:date[clf]] Request :method :url', {immediate: true}))
app.use(logger('[:date[clf]] Response :method :url Status - :status Time - :response-time ms Content length - :res[content-length]'))

// Parse the body text
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Routes '/api/users'
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/checkout', stripeRoutes);

// Error
app.use((req, res) => {
    res.status(404).json({
        message: 'Error serving the request !'
    });
});

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.use(session({store: MongoStore.create({client: mongoose.connection.client, dbName: "sessions"})}))

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });