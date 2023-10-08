const express = require("express");
const logger = require("morgan");
const sequelizeStoreConstructor = require("connect-session-sequelize");
const session = require("express-session");
const bodyParser = require("body-parser");
const userRoutes = require("../../routes/user");
const productRoutes = require("../../routes/product");
const cartRoutes = require("../../routes/cart");
const orderRoutes = require("../../routes/order");
const authRoutes = require("../../routes/auth");

const initializeExpress = (database) => {
  const app = express()
  app.request.database = database

  // Request logging

  app.use(logger('[:date[clf]] Request :method :url', {immediate: true}))
  app.use(logger('[:date[clf]] Response :method :url Status - :status Time - :response-time ms Content length - :res[content-length]'))

  // Sessions
  const SequelizeStore = sequelizeStoreConstructor(session.Store)
  app.use(session({
    secret: "ASDEjhgfdu845Fs12!43",
    store: new SequelizeStore({
      db: database,
      tableName: "sessions"
    }),
    resave: false,
    proxy: true,
    saveUninitialized: false
  }))

  // Parse the body text
  app.use(bodyParser.json())

  // CORS
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
  })

  // Routes
  app.use('/api/users', userRoutes)
  app.use('/api/products', productRoutes)
  app.use('/api/carts', cartRoutes)
  app.use('/api/orders', orderRoutes)
  app.use('/api/auth', authRoutes)

  // Error
  app.use((req, res) => {
    res.status(404).json({
      message: 'Error serving the request !'
    })
  })

  const PORT = process.env.PORT ?? 80
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

module.exports = initializeExpress
