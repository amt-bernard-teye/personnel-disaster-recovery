export const swaggerFindInitiativeSuccess = {
  description: "OK",
  status: 201,
  content: {
      "application/json": {
          schema: {
              type: "object",
              example: {
                "data": {
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
                    "image": "https://disaster-recovery-s3-1.s3.us-east-1.amazonaws.com/image1721915718665",
                    "email": "maryjones@mail.com",
                    "status": "AVAILABLE"
                  },
                  "end_date": "2024-07-31T11:37:00.444Z",
                  "state": "LOW",
                  "emergencyInitiativePersonnel": [
                    {
                      "personnel": {
                        "gender": "MALE",
                        "phoneNumber": "0554835290",
                        "digitalAddress": "GHA-120-000-3443",
                        "dob": "1997-12-01T00:00:00.000Z",
                        "town": "Apremdo",
                        "educationalBackground": {
                          "id": 5,
                          "qualification": "Masters in Science",
                          "studyField": "IT",
                          "personnelId": 9,
                          "graduationYear": 1990
                        },
                        "user": {
                          "name": "Prince Sam",
                          "email": "dalmunustu@gufum.com",
                          "image": "https://disaster-recovery-s3-1.s3.us-east-1.amazonaws.com/image1720174133307"
                        }
                      }
                    }
                  ]
                }
              }
          }
      }
  }
}

export const swaggerFindInitiativeValidationError = {
  description: "Validation error",
  status: 400,
  content: {
      "application/json": {
          schema: {
              type: "object",
              example: {
                "message": "Initiative doesn't exist",
                "error": "Bad Request",
                "statusCode": 400
              }
          }
      }
  }
}