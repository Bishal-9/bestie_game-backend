const { StatusCodes } = require("http-status-codes")

const validation = (validationSchema) => async (_request, _response, next) => {
    await validationSchema
        .validate(_request.body)
        .then(() => next())
        .catch((error) => {
            _response
                .status(StatusCodes.BAD_REQUEST)
                .json({
                    status: false,
                    message: error.message,
                    data: {}
                })
        })
}

module.exports = validation
