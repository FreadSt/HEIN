const initializeDatabase = require("../src/persistence/initializeDatabase");
const encryption = require("../src/utils/encryption")
const fs = require("fs")
require("dotenv").config()
require("chai").should()
const userProfiles = require("../tools/resources/users.json")
const DatabaseSeeder = require("../tools/DatabaseSeeder");

describe('Database', function () {
    let database
    const dbFilePath = "./testDatabase"

    before(async function () {
        try {
            fs.unlinkSync(dbFilePath)
            fs.rmSync(dbFilePath)
        } catch (e) {
            console.log(e)
        }

        const newDb = await initializeDatabase("sqlite:" + dbFilePath)
        await new DatabaseSeeder(newDb).seedAll()
        database = newDb
    })

    describe('User table', function () {
        it('should correctly add 5 users', async function () {
            return Promise.all(Object.values(userProfiles).map(async userJson => {
                const user = await database.models.Users.findOne({where: {username: userJson.username}})
                user.username.should.be.equal(userJson.username)
                user.email.should.be.equal(userJson.email)
                encryption.matchPassword(userJson.password, user.password).should.be.equal(true)
                user.isAdmin.should.be.equal(userJson.isAdmin)
            }))
        })
    })
})
