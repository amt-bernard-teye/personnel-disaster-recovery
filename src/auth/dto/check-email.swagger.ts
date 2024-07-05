export const swaggerCheckEmailSuccess = {
    description: "OK",
    status: 200,
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    message: "Email doesn't exist, you are free to use"
                }
            }
        }
    }
}

export const swaggerCheckEmailValidationError = {
    description: "OK",
    status: 400,
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    message: "Email already exist, try a different one",
                    error: "Bad Request",
                    statusCode: 400
                }
            }
        }
    }
}