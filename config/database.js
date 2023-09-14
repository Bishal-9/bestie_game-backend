const mongoose = require("mongoose")
const database_uri = process.env.MONGO_URI || ""

mongoose
    .connect(database_uri, {
        ssl: true,
        noDelay: true,
    })
    .then((value) => {
        console.log("Mongo DB connected with version of ", value.version)
    })
    .catch((error) => {
        console.error("MongoDB connection error: ", error.message)
    })

mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to database.")
})

mongoose.connection.on("error", (error) => {
    console.error("Mongoose connection error: ", error.message)
})

mongoose.connection.on("disconnected", () => {
    console.log("Mongoose connection is disconnected.")
})

process.on("SIGINT", () => {
    mongoose.connection.close(() => {
        console.log(
            "Mongoose connection is disconnected due to application termination."
        )
        process.exit(0)
    })
})
