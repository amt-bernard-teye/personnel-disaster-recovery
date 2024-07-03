export const swaggerActiveSuccess = {
    description: "OK",
    status: 200,
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    data: {
                      id: "PSL1000",
                      name: "James Smith",
                      email: "dalmunustu@gufum.com",
                      image: null,
                      role: "PERSONNEL",
                      accountStatus: "VERIFIED"
                    }
                }
            }
        }
    }
}