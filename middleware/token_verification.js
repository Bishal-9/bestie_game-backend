const { StatusCodes, ReasonPhrases } = require("http-status-codes")
const { verify_token } = require("../helper/token")

const token_verification = async (_request, _response, next) => {
    const token = _request.headers["access_token"]

    if (!token) {
        return _response
            .status(StatusCodes.UNAUTHORIZED)
            .json({
                status: false,
                message: "No Access Token found.",
                data: {}
            })
    }

    try {
        const verification = await verify_token(token)
        _request.user = verification

        next()
    } catch (error) {
        return _response
            .status(StatusCodes.UNAUTHORIZED)
            .json({
                status: false,
                message: "Invalid Access Token",
                data: {}
            })
    }
}

module.exports = token_verification
