export const swaggerApproveInitiativeSuccess = {
  description: "OK",
  status: 201,
  content: {
      "application/json": {
          schema: {
              type: "object",
              example: {
                "message": "You have been successfully added to the list"
              }
          }
      }
  }
}

export const swaggerApproveInitiativeValidationError = {
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