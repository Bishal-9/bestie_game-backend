const jwt = require("jsonwebtoken")

const secret_key = process.env.PRIVATE_KEY.toString().trim()

exports.sign_token = (payload) => {
    return jwt.sign(payload, secret_key, {
        issuer: "Bestie Game",
        algorithm: "HS512",
        expiresIn: "60d",
    })
}

exports.verify_token = async (token) => {
    return jwt.verify(token, secret_key, {
        issuer: "Bestie Game",
        algorithms: ["HS512"],
    })
}
