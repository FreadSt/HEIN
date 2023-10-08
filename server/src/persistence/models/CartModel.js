const {InitializableModel, initializableModels} = require("../initializeModels.js")

console.log("Loading CartModel")

class CartModel extends InitializableModel {
  static _tableName = "Carts"
  static getInstance = (database) => database.models.Carts
  static columns = (database) => { return {}}
  /** @param {Sequelize} database */
  static initCallback = (database) => {
    const cart = CartModel.getInstance(database)
    cart.belongsTo(database.models.Users)
    cart.belongsToMany(database.models.Products, {through: database.models.CartProducts})
  }
}

initializableModels.push(CartModel)

module.exports = CartModel
