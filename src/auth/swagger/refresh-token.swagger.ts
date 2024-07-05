export const swaggerRefreshTokenSuccess = {
    description: "OK",
    status: 200,
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    data: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJQU0wxMDAwIiwidG9rZW4iOiJhY2Nlc3MtdGsiLCJpYXQiOjE3MjAxNzgxMDYsImV4cCI6MTcyMDE3OTAwNn0.M97ZQ5NrYF7mc1oi_vv9bpqS-l0mbUGjvEat-pDdD_Q"
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