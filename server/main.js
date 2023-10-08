const initPromises = []

let database
const dotenv = require("dotenv")
dotenv.config()

initPromises.push(
  require("./src/persistence/initializeDatabase")()
    .then(newDatabase => database = newDatabase))

const server = require("./src/presentation/server")

Promise.all(initPromises).then(() => {
  server.initialize(database)
})
