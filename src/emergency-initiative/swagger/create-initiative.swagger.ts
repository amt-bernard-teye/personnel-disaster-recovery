export const swaggerCreateInitiativeSuccess = {
  description: "OK",
  status: 200,
  content: {
    "application/json": {
      schema: {
        type: "object",
        example: {
          "message": "Initiative added successfully",
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
            "state": "LOW"
          }
        }
      }
    }
  }
}

export const swaggerCreateInitiativeValidationError = {
  description: "Validation error",
  status: 400,
  content: {
    "application/json": {
      schema: {
        type: "object",
        example: {
          "message": [
            "dispatched_date must be a valid ISO 8601 date string",
            "dispatched_date should not be empty",
            "location should not be empty",
            "description should not be empty",
            "end_date must be a valid ISO 8601 date string"
          ],
          "error": "Bad Request",
          "statusCode": 400
        }
      }
    }
  }
}