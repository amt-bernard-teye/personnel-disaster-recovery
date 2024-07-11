export const swaggerFetchProfessionSuccess = {
    description: "OK",
    status: 200,
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    data: {
                        count: 1,
                        professions: [
                            {
                                "id": 1,
                                "name": "Doctor",
                                "emergencyId": 2,
                                "status": "AVAILABLE"
                            }
                        ]
                    }
                }
            }
        }
    }
}