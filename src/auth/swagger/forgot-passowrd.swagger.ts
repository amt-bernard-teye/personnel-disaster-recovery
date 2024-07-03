export const swaggerForgotPasswordSuccess = {
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

export const swaggerForgotPasswordValidationError = {
    description: "OK",
    status: 400,
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    message: [
                      "email must be an email",
                      "email should not be empty",
                    ],
                    error: "Bad Request",
                    statusCode: 400
                }
            }
        }
    }
}