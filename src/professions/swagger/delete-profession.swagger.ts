export const swaggerDeleteProfessionSuccess = {
    description: "OK",
    status: 200,
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    message: "Profession deleted successfully",
                }
            }
        }
    }
}

export const swaggerDeleteProfessionValidationError = {
    description: "Validation error",
    status: 400,
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    message: "Validation failed (numeric string is expected)",
                    error: "Bad Request",
                    statusCode: 400
                }
            }
        }
    }
}