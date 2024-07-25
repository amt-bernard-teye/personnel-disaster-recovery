export const swaggerCreateProjectSuccess = {
  description: "OK",
  status: 200,
  content: {
    "application/json": {
      schema: {
        type: "object",
        example: {
          "message": "Project created successfully",
          "data": {
            "id": 3,
            "created_at": "2024-07-25T08:54:57.675Z",
            "description": "Another description 3",
            "title": "Another testing 1"
          }
        }
      }
    }
  }
}

export const swaggerCreateProjectValidationError = {
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