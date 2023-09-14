const mongoose = require("mongoose")
const User = require("./user")

const passport_schema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User,
            require: [true, "User ID is required."],
        },
        password: {
            type: mongoose.Schema.Types.String,
            trim: true,
            required: [true, "Password is required."],
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Passport", passport_schema)
