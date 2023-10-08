const DataTypes = require("sequelize")
const {InitializableModel, initializableModels} = require("../initializeModels.js")

console.log("Loading ProductSizesModel")

class ProductSizesModel extends InitializableModel {
  static _tableName = "ProductSizes"
  static getInstance = (database) => database.models.ProductSizes
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
      SizeId: {
        type: DataTypes.INTEGER,
        references: {
          model: database.models.Sizes,
          allowNull: false,
          key: "id"
        }
      },
    }
  }
}

initializableModels.push(ProductSizesModel)

module.exports = ProductSizesModel
