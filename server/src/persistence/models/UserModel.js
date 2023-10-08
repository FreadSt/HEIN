const DataTypes = require("sequelize")
const {InitializableModel, initializableModels} = require("../initializeModels.js")

console.log("Loading UserModel")

class UserModel extends InitializableModel {
  static _tableName = "Users"
  static getInstance = (database) => database.models.Users
  static columns = () => {
    return {
      username: {
        type: DataTypes.STRING, allowNull: false, unique: true
      },
      email: {
        type: DataTypes.STRING, allowNull: false, unique: true, validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.BLOB, allowNull: false
      },
      isAdmin: {
        type: DataTypes.BOOLEAN, defaultValue: false
      }
    }
  }
}

initializableModels.push(UserModel)

module.exports = UserModel
