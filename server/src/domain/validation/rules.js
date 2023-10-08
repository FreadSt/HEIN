const Result = require("../Result");
/**
 * @param {string} input
 */
const onlyAlphanumeric = (input) => {
    for (let i = 0; i < input.length; i++) {
        const charCode = input.charCodeAt(i)

        const isNumber = charCode >= 48 && charCode <= 57
        const isUppercase = charCode >= 65 && charCode <= 90
        const isLowercase = charCode >= 97 && charCode <= 122

        if (!(isNumber || isUppercase || isLowercase)) {
            return Result.failure(`String contains non-alphanumeric characters. Input: ${input}`)
        }
    }

    return Result.success()
}

module.exports = {
    onlyAlphanumeric
}
