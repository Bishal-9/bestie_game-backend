class CustomError extends Error {
    constructor(statusCode, message) {
        super(message)

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError)
        }

        this.customError = true
        this.statusCode = statusCode
    }
}

module.exports = CustomError
