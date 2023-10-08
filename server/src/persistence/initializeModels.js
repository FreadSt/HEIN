const {Model} = require("sequelize")

const invocationOrder = ["./models/UserModel.js", "./models/SizeModel.js", "./models/ColorModel.js", "./models/ProductModel.js", "./models/CartModel.js", "./models/OrderModel.js", "./models/ProductColorsModel.js", "./models/ProductSizesModel.js", "./models/CartProductsModel.js", "./models/OrderProductsModel.js"]

class InitializableModel extends Model {
  /** @type {string} */
  static _tableName

  static getInstance

  /** @type {(Sequelize) => any} */
  static columns = (database) => {
    return {}
  }

  /** @param {Sequelize} database */
  static initCallback = (database) => {
  }
}

module.exports.InitializableModel = InitializableModel

const initializableModels = []
module.exports.initializableModels = initializableModels

module.exports.initializeModels = (database) => {
  console.log("Starting database initialization")
  invocationOrder.forEach(model => require(model))
  const callbacks = []
  initializableModels.forEach(model => {
    model.init(model.columns(database), {sequelize: database, modelName: model._tableName})
    callbacks.push(model.initCallback)
  })
  callbacks.forEach(callback => {
    callback(database)
  })
  console.log("Database initialized")
  return database.sync()
}
