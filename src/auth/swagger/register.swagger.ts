export const swaggerRegisterSuccess = {
    description: "OK",
    status: 200,
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    message: "Please check your email to complete your registration"
                }
            }
        }
    }
}

export const swaggerRegisterValidationError = {
    description: "OK",
    status: 400,
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    message: [
                      "name should not be empty",
                      "email must be an email",
                      "email should not be empty",
                      "password is not strong enough",
                      "password should not be empty",
                      "confirmPassword should not be empty"
                    ],
                    error: "Bad Request",
                    statusCode: 400
                }
            }
        }
    }
}