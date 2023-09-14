
const CustomError = require("../error/CustomError")
const { ReasonPhrases, StatusCodes } = require("http-status-codes")
const User = require("../model/user")
const Passport = require("../model/passport")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.sign_up = async (_request, _response, next) => {
    try {

        const { email, user_name, password } = _request.body
        
        // * Check if user already exist 
        const existing_user = await User.findOne({ email: email })
        if (existing_user) {
            return _response
                .status(StatusCodes.CONFLICT)
                .json({
                    status: false,
                    message: "User already exist.",
                    data: {}
                })
        }

        // * Generate Password
        const salt = await bcrypt.genSalt(10)
        const encrypted_password = await bcrypt.hash(password, salt)

        // * Store User
        const stored_data = await User.create({ email, user_name })

        // * Store Password
        const stored_passport = await Passport.create({ user_id: stored_data._id, password: encrypted_password })

        _response
            .status(StatusCodes.CREATED)
            .json({
                status: true,
                message: "New User created successfully!",
                data: {
                    email,
                    user_name
                }
            })
    } catch (error) {
        next(new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, error.message))
    }
}

exports.login = async (_request, _response) => {
    try {
        
        const { email, password } = _request.body

        // * Check if user exist
        const exist_user = await User.findOne({ email })
        if (!exist_user) {
            return _response
                .status(StatusCodes.NOT_FOUND)
                .json({
                    status: false,
                    message: "User does not exist.",
                    data: {}
                })
        }

        // * Check if password exist
        const stored_password = await Passport.findOne({ user_id: exist_user._id })
        if (!stored_password) {
            await User.deleteOne({ email })
            return _response
                .status(StatusCodes.NOT_FOUND)
                .json({
                    status: false,
                    message: "User does not exist.",
                    data: {}
                })
        }

        // * Check if password is correct 
        const is_password_correct = await bcrypt.compare(password, stored_password.password)
        if (!is_password_correct) {
            return _response
                .status(StatusCodes.UNAUTHORIZED)
                .json({
                    status: false,
                    message: "Incorrect credentials.",
                    data: {}
                })
        }

        // * Generate tokens
        const token_payload = {
            _id: exist_user._id,
            email: exist_user.email,
            user_name: exist_user.user_name
        }
        
    } catch (error) {
        next(new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, error.message))
    }
}