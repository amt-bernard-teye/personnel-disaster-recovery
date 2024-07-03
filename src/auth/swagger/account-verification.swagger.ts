export const swaggerAccountVerificationSuccess = {
    description: "OK",
    status: 200,
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    message: "Account verified"
                }
            }
        }
    }
}

export const swaggerAccountVerificationValidationError = {
    description: "OK",
    status: 400,
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    message: "Invalid token",
                    error: "Bad Request",
                    statusCode: 400
                }
            }
        }
    }
}