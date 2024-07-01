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
                            accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBRE0xIiwiaWF0IjoxNzE5ODQxNDUxLCJleHAiOjE3MTk4NDIzNTF9.kr3pjbteowEv4N_v55d7R_ayXovKJMvEAqMyMSz7Fkc",
                            refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBRE0xIiwiZW1haWwiOiJhZG1pbjEyM0BtYWlsLmNvbSIsImlhdCI6MTcxOTg0MTQ1MSwiZXhwIjoxNzIyNDMzNDUxfQ.vG53CQkp3PktzStyqWisuvZmqvE97I6adHQSmU2_IxY"
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