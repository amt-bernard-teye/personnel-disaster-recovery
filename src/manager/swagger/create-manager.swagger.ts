export const swaggerCreateManagerSuccess = {
  description: "OK",
  status: 200,
  content: {
    "application/json": {
      schema: {
        type: "object",
        example: {
          "message": "Manager added successfully",
          "data": {
            "id": 2,
            "created_at": "2024-07-25T13:57:09.919Z",
            "name": "Ann Yeboah",
            "email": "anna45@gmail.com",
            "phoneNumber": "0554835290",
            "image": "https://disaster-recovery-s3-1.s3.us-east-1.amazonaws.com/image1721915826237",
            "status": "AVAILABLE"
          }
        }
      }
    }
  }
}

export const swaggerCreateManagerValidationError = {
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