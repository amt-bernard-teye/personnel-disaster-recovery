export const swaggerFetchManagerSuccess = {
  description: "OK",
  status: 200,
  content: {
    "application/json": {
      schema: {
        type: "object",
        example: {
          "data": {
            "count": 2,
            "managers": [
              {
                "id": 1,
                "created_at": "2024-07-25T13:55:22.490Z",
                "name": "Mary Williams",
                "email": "mary45@gmail.com",
                "phoneNumber": "0554835290",
                "image": "https://disaster-recovery-s3-1.s3.us-east-1.amazonaws.com/image1721915718665sdfsfs",
                "status": "AVAILABLE"
              },
              {
                "id": 2,
                "created_at": "2024-07-25T13:57:09.919Z",
                "name": "Ann Yeboah",
                "email": "anna45@gmail.com",
                "phoneNumber": "0554835290",
                "image": "https://disaster-recovery-s3-1.s3.us-east-1.amazonaws.com/image1721915826237sdsdf",
                "status": "AVAILABLE"
              }
            ]
          }
        }
      }
    }
  }
}