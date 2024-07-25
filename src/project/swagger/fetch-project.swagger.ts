export const swaggerFetchProjectSuccess = {
  description: "OK",
  status: 200,
  content: {
    "application/json": {
      schema: {
        type: "object",
        example: {
          "data": {
            "count": 2,
            "projects": [
              {
                "id": 1,
                "created_at": "2024-07-25T08:51:31.101Z",
                "description": "Desc",
                "title": "Testing"
              },
              {
                "id": 2,
                "created_at": "2024-07-25T08:52:40.363Z",
                "description": "Another description",
                "title": "Another testing"
              }
            ]
          }
        }
      }
    }
  }
}