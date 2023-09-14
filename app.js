const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const helmet = require("helmet")
const compression = require("compression")
const { ReasonPhrases, StatusCodes } = require("http-status-codes")

const { log } = require("./config/logger")
const corsOptions = require("./config/corsOptions")
const compressionOptions = require("./config/compressionOptions")

const app = express()

app.use(helmet())
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(log)
app.use(compression(compressionOptions))

app.get("/", (_request, _response) => {
    _response.status(StatusCodes.OK).json({
        status: true,
        message: ReasonPhrases.OK,
        data: {}
    })
})

const v1 = require("./route")
app.use("/api/v1", v1)

// * 404 Route
app.use("*", (_request, _response) => {
    _response.status(StatusCodes.NOT_FOUND).json({
        status: false,
        message: ReasonPhrases.NOT_FOUND,
        data: {}
    })
})

// * Error Handler
const errorHandler = require("./error/handleError")
app.use(errorHandler)

module.exports = app
