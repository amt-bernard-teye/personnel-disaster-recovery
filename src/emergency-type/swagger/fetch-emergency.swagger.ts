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
                                "status": "ACTIVE",
                                "created_at": "2024-07-19T04:44:02.473Z"
                            },
                            {
                                "id": 2,
                                "name": "Natural Disaster",
                                "status": "ACTIVE",
                                "created_at": "2024-07-19T04:44:02.473Z"
                            }
                        ]
                    }
                }
            }
        }
    }
}