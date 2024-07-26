export const swaggerUpdateManagerSuccess = {
  description: "OK",
  status: 200,
  content: {
      "application/json": {
          schema: {
              type: "object",
              example: {
                "message": "Manager updated successfully",
                "data": {
                  "id": 1,
                  "created_at": "2024-07-25T13:55:22.490Z",
                  "name": "Mary Jones",
                  "email": "maryjones@mail.com",
                  "phoneNumber": "0554835290",
                  "image": "https://disaster-recovery-s3-1.s3.us-east-1.amazonaws.com/image1721915718665",
                  "status": "AVAILABLE"
                }
              }
          }
      }
  }
}

export const swaggerUpdateManagerValidationError = {
  description: "Validation error",
  status: 400,
  content: {
      "application/json": {
          schema: {
              type: "object",
              example: {
                "message": [
                  "phoneNumber must match /^[0-9]{10}$/ regular expression",
                  "email must be an email"
                ],
                "error": "Bad Request",
                "statusCode": 400
              }
          }
      }
  }
}