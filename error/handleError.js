const fs = require("fs")
const path = require("path")
const { ReasonPhrases, StatusCodes } = require("http-status-codes")

module.exports = async (error, request, response, next) => {
   console.error(error.message)

   // * Logging errors to a file
   fs.appendFileSync(
      path.join(__dirname, "../logs/InternalErrorLog.log"),
      "\n\n" + error?.stack
   )

   if (error.customError) {
      response.status(error.statusCode).json({
         status: false,
         message: ReasonPhrases.FORBIDDEN,
         data: error.message
      })
   } else {
      if (process.env.ENVIRONMENT === "PRODUCTION") {
         // ! FOR PRODUCTION
         response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: false,
            message: ReasonPhrases.INTERNAL_SERVER_ERROR,
            data: {}
         })
      } else {
         // ! FOR DEVELOPMENT
         response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: false,
            message: ReasonPhrases.INTERNAL_SERVER_ERROR,
            data: {}
         })
      }
   }
}
