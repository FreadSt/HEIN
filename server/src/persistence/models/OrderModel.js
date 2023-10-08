const DataTypes = require("sequelize")
const {InitializableModel, initializableModels} = require("../initializeModels.js")

console.log("Loading OrderModel")

class OrderModel extends InitializableModel {
  static _tableName = "Orders"
  static getInstance = (database) => database.models.Orders
  static columns = (database) => {
    return {
      address: {
        type: DataTypes.STRING, allowNull: false
      },
      status: {
        type: DataTypes.STRING, defaultValue: "pending"
      }
    }
  }
  static initCallback = (database) => {
    const order = OrderModel.getInstance(database)
    order.belongsTo(database.models.Users)
    order.belongsToMany(database.models.Products, {through: database.models.CartProducts})
  }
}

initializableModels.push(OrderModel)

module.exports = OrderModel
