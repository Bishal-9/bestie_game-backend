const mongoose = require("mongoose")

const user_schema = new mongoose.Schema(
    {
        email: {
            type: mongoose.Schema.Types.String,
            lowercase: true,
            unique: true,
            trim: true,
            required: [true, "Email is required."]
        },
        user_name: {
            type: mongoose.Schema.Types.String,
            required: [true, "User Name is required."]
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("User", user_schema)
