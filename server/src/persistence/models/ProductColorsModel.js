const DataTypes = require("sequelize")
const {InitializableModel, initializableModels} = require("../initializeModels.js")

console.log("Loading ProductColorsModel")

class ProductColorsModel extends InitializableModel {
  static _tableName = "ProductColors"
  static getInstance = (database) => database.models.ProductColors
  static columns = (database) => {
    return {
      ProductId: {
        type: DataTypes.INTEGER,
        references: {
          model: database.models.Products,
          allowNull: false,
          key: "id"
        }
      },
      ColorId: {
        type: DataTypes.INTEGER,
        references: {
          model: database.models.Colors,
          allowNull: false,
          key: "id"
        }
      },
    }
  }
}

initializableModels.push(ProductColorsModel)

module.exports = ProductColorsModel
