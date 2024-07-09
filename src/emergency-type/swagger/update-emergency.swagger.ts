export const swaggerUpdateEmergencySuccess = {
    description: "OK",
    status: 200,
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    message: "Updated emergency type successfully",
                    data: {
                        "id": 1,
                        "name": "Home",
                        "status": "ACTIVE"
                    }
                  }
            }
        }
    }
}

export const swaggerUpdateEmergencyValidationError = {
    description: "Validation error",
    status: 400,
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    message: [
                      "name should not be empty"
                    ],
                    error: "Bad Request",
                    statusCode: 400
                }
            }
        }
    }
}