export const swaggerFetchProfessionSuccess = {
    description: "OK",
    status: 200,
    content: {
        "application/json": {
            schema: {
                type: "object",
                example: {
                    data: {
                        count: 3,
                        professions: [
                            {
                                "id": 1,
                                "name": "Another Testing",
                                "status": "AVAILABLE",
                                "created_at": "2024-07-19T04:44:02.473Z"
                            },
                            {
                                "id": 2,
                                "name": "Fire Fighter",
                                "status": "AVAILABLE",
                                "created_at": "2024-07-19T04:44:02.473Z"
                            },
                            {
                                "id": 3,
                                "name": "Soldier",
                                "status": "AVAILABLE",
                                "created_at": "2024-07-19T04:44:02.473Z"
                            },
                        ]
                    }
                }
            }
        }
    }
}