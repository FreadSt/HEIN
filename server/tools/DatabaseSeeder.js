const {encryptPassword} = require("../src/utils/encryption");

class DatabaseSeeder {
    /** @type {Sequelize} */
    #database

    constructor(database) {
        this.#database = database
    }

    async seedAll() {
        await this.seedUsers()
        await this.seedColors()
    }

    async seedUsers() {
        const users = require("./resources/users.json")
        return Promise.all(Object.values(users).map(async userJson => {
            const user = Object.assign({}, userJson)
            user.password = encryptPassword(userJson.password)
            await this.#database.models.Users.create(user)
        }))
    }

    async seedColors() {
        await this.#seedFromResources("./resources/colors.json", this.#database.models.Colors)
    }

    async #seedFromResources(path, model) {
        const objects = require(path)
        return Promise.all(Object.values(objects).map(object => model.create(object)))
    }
}

module.exports = DatabaseSeeder
