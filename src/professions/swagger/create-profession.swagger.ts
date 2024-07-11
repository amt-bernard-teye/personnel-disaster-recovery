export const swaggerCreateProfessionSuccess = {
    description: "OK",
    status: 200,
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    message: "Profession was added successfully",
                    data: {
                        id: 1,
                        name: "Doctor",
                        emergencyId: 2,
                        status: "AVAILABLE"
                    }
                }
            }
        }
    }
}

export const swaggerCreateProfessionValidationError = {
    description: "Validation error",
    status: 400,
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    message: [
                      "name should not be empty",
                      "emergencyId should not be empty"
                    ],
                    error: "Bad Request",
                    statusCode: 400
                }
            }
        }
    }
}