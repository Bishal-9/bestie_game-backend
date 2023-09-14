const compression = require("compression")

const compressionOptions = {
    level: 9,
    threshold: 10 * 1000,
    filter: (_request, _response) => {
        if (_request.headers["x-no-compression"]) return false
        return compression.filter(_request, _response)
    },
}

module.exports = compressionOptions
