const DataTypes = require("sequelize")
const {InitializableModel, initializableModels} = require("../initializeModels.js")

console.log("Loading Product model")

class ProductModel extends InitializableModel {
  static _tableName = "Products"
  static getInstance = (database) => database.models.Products
  static columns = (database) => {
    return {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false
      },
      category: {
        type: DataTypes.STRING
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      inStock: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }
  }
  static initCallback = (database) => {
    const product = ProductModel.getInstance(database)
    product.belongsToMany(database.models.Colors, {through: database.models.ProductColors})
    product.belongsToMany(database.models.Sizes, {through: database.models.ProductSizes})
  }
}

initializableModels.push(ProductModel)

module.exports = ProductModel
