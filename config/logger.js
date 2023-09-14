const { createLogger, format, transports } = require("winston")
const { combine, timestamp, printf } = format

const customFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}] -> ${message}`
})

const logger = createLogger({
    level: "info",
    format: combine(
        timestamp({ format: "HH:mm:ss, DD:MM:YYYY" }),
        customFormat
    ),
    transports: [
        new transports.File({
            filename: "./logs/error.log",
            level: "error",
            timestamp: timestamp(),
        }),
        new transports.File({
            filename: "./logs/combined.log",
            timestamp: timestamp(),
        }),
        new transports.Console(),
    ],
})

const log = (_request, _response, next) => {
    if (_request.url.includes("/api/v1/auth")) {
        logger.info(
            `IP: ${_request.ip}, Request: ${_request.url} \n Method: ${_request.method}\n\n`
        )
    } else {
        logger.info(`
            IP: ${_request.ip}
            Request: ${_request.url}
            Method: ${_request.method} 
            Body: ${JSON.stringify(_request.body)}
        `)
    }

    next()
}

module.exports = { log, logger }
