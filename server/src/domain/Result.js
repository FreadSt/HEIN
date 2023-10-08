const ResultError = require("./ResultError");

class Result {
    isSuccess
    #value

    constructor(isSuccess, value) {
        this.isSuccess = isSuccess
        this.#value = value
    }

    getOrNull() {
        if (this.isSuccess) {
            return this.#value ?? true
        }
        return null
    }

    getOrThrow() {
        if (this.isSuccess) {
            return this.#value ?? true
        }
        throw new ResultError(this.#value)
    }

    errorOrNull() {
        if (this.isSuccess) return null
        return new ResultError(this.#value)
    }

    static success(value) {
        return new Result(true, value)
    }

    static failure(errorMessage) {
        return new Result(false, errorMessage)
    }
}

module.exports = Result
