export const swaggerFetchInitiativeSuccess = {
  description: "OK",
  status: 200,
  content: {
      "application/json": {
          schema: {
              type: "object",
              example: {
                "data": {
                  "count": 2,
                  "initiatives": [
                    {
                      "id": 1,
                      "created_at": "2024-07-28T11:37:51.397Z",
                      "dispatched_date": "2024-07-28T11:37:00.444Z",
                      "location": "Northern Region",
                      "emergencyType": {
                        "id": 1,
                        "created_at": "2024-07-19T04:44:02.473Z",
                        "name": "Home",
                        "status": "ACTIVE"
                      },
                      "description": "Getting better",
                      "manager": {
                        "id": 1,
                        "created_at": "2024-07-25T13:55:22.490Z",
                        "name": "Mary Jones",
                        "phoneNumber": "0554835290",
                        "image": "XXXXX",
                        "email": "maryjones@mail.com",
                        "status": "AVAILABLE"
                      },
                      "end_date": "2024-07-31T11:37:00.444Z",
                      "state": "LOW"
                    },
                    {
                      "id": 2,
                      "created_at": "2024-07-28T12:31:05.698Z",
                      "dispatched_date": "2024-07-28T12:29:48.552Z",
                      "location": "Apremdo",
                      "emergencyType": {
                        "id": 2,
                        "created_at": "2024-07-19T04:44:02.473Z",
                        "name": "Natural Disaster",
                        "status": "ACTIVE"
                      },
                      "description": "Starting",
                      "manager": {
                        "id": 2,
                        "created_at": "2024-07-25T13:57:09.919Z",
                        "name": "Ama Yaa",
                        "phoneNumber": "0554835290",
                        "image": "XXXX.....",
                        "email": "amayaa@mail.com",
                        "status": "UNAVAILABLE"
                      },
                      "end_date": "2024-08-01T12:29:48.552Z",
                      "state": "LOW"
                    }
                  ]
                }
              }
          }
      }
  }
}