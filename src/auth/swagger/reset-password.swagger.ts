export const swaggerResetPasswordSuccess = {
    description: "OK",
    status: 200,
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    message: "Check your email to complete your password reset"
                }
            }
        }
    }
}

export const swaggerResetPasswordValidationError = {
    description: "OK",
    status: 400,
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    message: [
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