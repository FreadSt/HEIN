const DataTypes = require("sequelize")
const {InitializableModel, initializableModels} = require("../initializeModels.js")

console.log("Loading CartProductsModel")

class CartProductsModel extends InitializableModel {
  static _tableName = "CartProducts"
  static getInstance = (database) => database.models.CartProducts
  /** @param {Sequelize} database */
  static columns = (database) => {
    return {
      CartId: {
        type: DataTypes.INTEGER,
        references: {
          model: database.models.Carts,
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

initializableModels.push(CartProductsModel)

module.exports = CartProductsModel
