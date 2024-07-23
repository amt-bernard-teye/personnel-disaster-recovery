export const swaggerCreatePersonnelSuccess = {
  description: "OK",
  status: 200,
  content: {
      "application/json": {
          schema: {
              type: "object",
              example: {
                message: "Saved successfully",
              }
          }
      }
  }
}

export const swaggerCreatePersonnelValidationError = {
  description: "Validation error",
  status: 400,
  content: {
      "application/json": {
          schema: {
              type: "object",
              example: {
                  message: "Profession doesn't exist or your account isn't recognized",
                  error: "Bad Request",
                  statusCode: 400
              }
          }
      }
  }
}