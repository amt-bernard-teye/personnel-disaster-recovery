export const swaggerChangeImageSuccess = {
    description: "OK",
    status: 200,
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    message: "Image uploaded"
                }
            }
        }
    }
}

export const swaggerChangeImageValidationError = {
    description: "OK",
    status: 500,
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    message: "Image failed to upload, please try again",
                    error: "Bad Request",
                    statusCode: 500
                }
            }
        }
    }
}