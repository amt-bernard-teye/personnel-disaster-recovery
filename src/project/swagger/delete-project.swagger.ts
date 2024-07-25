export const swaggerDeleteProjectSuccess = {
  description: "OK",
  status: 200,
  content: {
      "application/json": {
          schema: {
              type: "object",
              example: {
                "message": "Project deleted successfully"
              }
          }
      }
  }
}

export const swaggerDeleteProjectValidationError = {
  description: "Validation error",
  status: 400,
  content: {
      "application/json": {
          schema: {
              type: "object",
              example: {
                "message": "Project doesn't exist",
                "error": "Bad Request",
                "statusCode": 400
              }
          }
      }
  }
}