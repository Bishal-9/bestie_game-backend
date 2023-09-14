const yup = require("yup")

exports.sign_up = yup.object({
    email: yup
        .string()
        .required("Email is required.")
        .lowercase("Email must be in lower case.")
        .email("Invalid email.")
        .trim("Email must be trimmed."),
    user_name: yup
        .string()
        .required("User Name is required.")
        .min(2, "User Name be minimum of 2 characters long.")
        .trim("User Name must be trimmed."),
    password: yup
        .string()
        .required("Password is required.")
        .trim("Password must be trimmed.")
        .min(8, "Password must be at least of 8 characters.")
        .max(32, "Password should not exceed 32 characters."),
})

exports.login = yup.object({
    email: yup
        .string()
        .required("Email is required.")
        .lowercase("Email must be in lower case.")
        .email("Invalid email.")
        .trim("Email must be trimmed."),
    password: yup
        .string()
        .required("Password is required.")
        .trim("Password must be trimmed.")
        .min(8, "Password must be at least of 8 characters.")
        .max(32, "Password should not exceed 32 characters.")
})
