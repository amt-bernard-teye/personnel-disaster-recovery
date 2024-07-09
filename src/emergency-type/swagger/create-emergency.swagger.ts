export const swaggerCreateEmergencySuccess = {
    description: "OK",
    status: 200,
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    message: "Added emergency type successfully",
                    data: {
                        id: 1,
                        name: "Natural Disaster",
                        status: "ACTIVE"
                    }
                }
            }
        }
    }
}