const {Sequelize} = require("sequelize")
const {initializeModels} = require("./initializeModels.js")

console.log("Initiating database connection")

const initializeDatabase = async (dbPath = process.env.DATABASE) => {
  const database = new Sequelize(dbPath)
  await initializeModels(database)
  return database
}

module.exports = initializeDatabase
