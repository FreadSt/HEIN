const DataTypes = require("sequelize")
const {InitializableModel, initializableModels} = require("../initializeModels.js")

console.log("Loading ColorModel")

class ColorModel extends InitializableModel {
  static _tableName = "Colors"
  static getInstance = (database) => database.models.Colors
  static columns = (database) => {
    return {
      internalName: {
        type: DataTypes.STRING, allowNull: false, unique: true
      },
      displayName: {
        type: DataTypes.STRING, allowNull: false,
      },
      code: {
        type: DataTypes.STRING, allowNull: false
      },
    }
  }
  static initCallback = (database) => {
    const color = ColorModel.getInstance(database)
    color.belongsToMany(database.models.Products, {through: database.models.ProductColors})
  }
}

initializableModels.push(ColorModel)

module.exports = ColorModel
