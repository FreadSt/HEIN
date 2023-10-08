const {onlyAlphanumeric} = require("../validation/rules");
const {encryptPassword} = require("../../utils/encryption");

class UserDto {
    username
    password
    email
    isAdmin

    constructor(username, password, email, isAdmin) {
        this.username = UserDto.#validateUsername(username)
        this.password = UserDto.#validatePassword(password)
        this.email = UserDto.#validateEmail(email)
        this.isAdmin = UserDto.#validateIsAdmin(isAdmin)
        Object.freeze(this)
    }

    static fromRequestBody(body) {
        return new UserDto(body.username, body.password, body.email, false)
    }

    static fromDatabase(entity) {
        return new UserDto(entity.username, entity.password, entity.email, entity.isAdmin)
    }

    static #validateUsername(string) {
        let error
        if (typeof string !== "string") throw new ValidationError("Username should be a string")
        if (string.length < 3) throw new ValidationError("Username should be min 3 characters")
        error = onlyAlphanumeric(string).errorOrNull()
        if (error) throw new ValidationError(`Username validation error: ${error.message}`)
        return string
    }

    static #validatePassword(string) {
        //TODO
        return encryptPassword(string)
    }

    static #validateEmail(string) {
        //TODO
        return string
    }

    static #validateIsAdmin(boolean) {
        //TODO
        return boolean
    }
}

module.exports = UserDto
