export const swaggerFetchPersonnelnSuccess = {
  description: "OK",
  status: 200,
  content: {
      "application/json": {
          schema: {
              type: "object",
              example: {
                  data: {
                    "count": 1,
                    "personnel": [
                      {
                        "id": "PSL1000",
                        "name": "Prince Sam",
                        "email": "dalmunustu@gufum.com",
                        "image": "https://disaster-recovery-s3-1.s3.us-east-1.amazonaws.com/image1720174133307",
                        "profession": "Fire Fighter",
                        "status": "PENDING",
                        "createdAt": "2024-07-21T17:30:43.485Z"
                      }
                    ]
                  }
              }
          }
      }
  }
}