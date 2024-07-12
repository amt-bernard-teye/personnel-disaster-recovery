export const swaggerUpdateProfessionSuccess = {
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

export const swaggerUpdateProfessionValidationError = {
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