export const swaggerReSendMailSuccess = {
    description: "OK",
    status: 200,
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    message: "Email re-send was successful, check your email"
                }
            }
        }
    }
}

export const swaggerReSendMailValidationError = {
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