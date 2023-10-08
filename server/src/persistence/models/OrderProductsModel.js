const DataTypes = require("sequelize")
const {InitializableModel, initializableModels} = require("../initializeModels.js")

console.log("Loading OrderProductsModel")

class OrderProductsModel extends InitializableModel {
  static _tableName = "OrderProducts"
  static getInstance = (database) => database.models.OrderProducts
  static columns = (database) => {
    return {
      OrderId: {
        type: DataTypes.INTEGER,
        references: {
          model: database.models.Orders,
          allowNull: false,
          key: "id"
        }
      },
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: database.models.Users,
          allowNull: false,
          key: "id"
        }
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }
  }
}

initializableModels.push(OrderProductsModel)

module.exports = OrderProductsModel
