export const swaggerLoginSuccess = {
    description: "OK",
    status: 200,
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    message: "Access granted",
                    data: {
                        token: {
                            accessToken: "XXXXXXXX......",
                            refreshToken: "XXXXXXXX......"
                        },
                        user: {
                            name: "Admin",
                            email: "admin123@mail.com",
                            image: null,
                            role: "ADMIN",
                            accountStatus: "VERIFIED"
                        }
                    }
                }
            }
        }
    }
}

export const swaggerLoginValidationError = {
    description: "OK",
    status: 400,
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    message: "Invalid login credentials",
                    error: "Bad Request",
                    statusCode: 400
                }
            }
        }
    }
}