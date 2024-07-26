export const swaggerDeleteManagerSuccess = {
  description: "OK",
  status: 200,
  content: {
      "application/json": {
          schema: {
              type: "object",
              example: {
                "message": "Manager deleted successfully"
              }
          }
      }
  }
}

export const swaggerDeleteManagerValidationError = {
  description: "Validation error",
  status: 400,
  content: {
      "application/json": {
          schema: {
              type: "object",
              example: {
                "message": "Manager doesn't exist",
                "error": "Bad Request",
                "statusCode": 400
              }
          }
      }
  }
}