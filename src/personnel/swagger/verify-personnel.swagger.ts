export const swaggerVerifyPersonnelSuccess = {
  description: "OK",
  status: 200,
  content: {
      "application/json": {
          schema: {
              type: "object",
              example: {
                message: "Personnel approved successfully"
              }
          }
      }
  }
}

export const swaggerVerifyPersonnelValidationError = {
  description: "Validation error",
  status: 400,
  content: {
    "application/json": {
      schema: {
        type: "object",
        example: {
          message: "Personnel doesn't exist",
          error: "Bad Request",
          statusCode: 400
        }
      }
    }
  }
}