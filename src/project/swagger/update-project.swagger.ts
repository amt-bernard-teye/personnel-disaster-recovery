export const swaggerUpdateProjectSuccess = {
  description: "OK",
  status: 200,
  content: {
      "application/json": {
          schema: {
              type: "object",
              example: {
                "message": "Project updated successfully",
                "data": {
                  "id": 1,
                  "created_at": "2024-07-25T08:51:31.101Z",
                  "description": "Wonderful",
                  "title": "Getting better"
                }
              }
          }
      }
  }
}

export const swaggerUpdateProjectValidationError = {
  description: "Validation error",
  status: 400,
  content: {
      "application/json": {
          schema: {
              type: "object",
              example: {
                "message": [
                  "title should not be empty",
                  "description should not be empty"
                ],
                "error": "Bad Request",
                "statusCode": 400
              }
          }
      }
  }
}