export const swaggerRefreshTokenSuccess = {
    description: "OK",
    status: 200,
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    data: "XXXXXXXX......"
                }
            }
        }
    }
}

export const swaggerRefreshTokenValidationError = {
    description: "OK",
    status: 400,
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    message: "Access denied",
                    error: "Unauthorized",
                    statusCode: 401
                  }
            }
        }
    }
}