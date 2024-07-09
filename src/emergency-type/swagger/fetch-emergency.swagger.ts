export const swaggerFetchEmergencySuccess = {
    description: "OK",
    status: 200,
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    data: {
                        count: 1,
                        emergencyTypes: [
                            {
                                "id": 1,
                                "name": "Home",
                                "status": "ACTIVE"
                            }
                        ]
                    }
                }
            }
        }
    }
}