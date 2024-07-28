export const swaggerFetchInitiativeSuccess = {
  description: "OK",
  status: 200,
  content: {
      "application/json": {
          schema: {
              type: "object",
              example: {
                "data": {
                  "count": 0,
                  "initiatives": []
                }
              }
          }
      }
  }
}