const { StatusCodes, ReasonPhrases } = require("http-status-codes")
const CustomError = require("../error/CustomError")

const corsOptions = {
    method: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
    origin: (origin, callback) => {
        callback(null, true)

        // ! If origins are known then go for this
        // if (allowOrigins.indexOf(origin) !== -1 || !origin) {
        //     callback(null, true)
        // } else {
        //     callback(
        //         new CustomError(StatusCodes.FORBIDDEN, ReasonPhrases.FORBIDDEN),
        //         false
        //     )
        // }
    },
}

module.exports = corsOptions
