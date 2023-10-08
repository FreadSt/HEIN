const DataTypes = require("sequelize")
const {InitializableModel, initializableModels} = require("../initializeModels.js")

console.log("Loading SizeModel")

class SizeModel extends InitializableModel {
  static _tableName = "Sizes"
  static getInstance = (database) => database.models.Sizes
  static columns = (database) => {
    return {
      internalName: {
        type: DataTypes.STRING, allowNull: false, unique: true
      },
      displayName: {
        type: DataTypes.STRING, allowNull: false,
      },
    }
  }
  static initCallback = (database) => {
    const size = SizeModel.getInstance(database)
    size.belongsToMany(database.models.Products, {through: database.models.ProductSizes})
  }
}

initializableModels.push(SizeModel)

module.exports = SizeModel
