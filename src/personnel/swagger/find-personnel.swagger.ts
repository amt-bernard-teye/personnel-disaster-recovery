export const swaggerFindPersonnelSuccess = {
  description: "OK",
  status: 200,
  content: {
    "application/json": {
      schema: {
        type: "object",
        example: {
          "data": {
            "id": 1,
            "availability": "AVAILABLE",
            "digitalAddress": "GA-183-8164",
            "dob": "2000-08-15T00:00:00.000Z",
            "gender": "MALE",
            "houseNumber": "PN 289/3",
            "phoneNumber": "0203631199",
            "status": "PENDING",
            "town": "Kasoa",
            "userId": "PSL1000",
            "educationalBackground": {
              "id": 1,
              "qualification": "Masters",
              "studyField": "Software engineering",
              "personnelId": 1,
              "graduationYear": 2010
            },
            "user": {
              "id": "PSL1000",
              "name": "George Asiedu",
              "email": "asiedug41@gmail.com",
              "image": "https://disaster-recovery-s3-1.s3.us-east-1.amazonaws.com/image1722008214779",
              "role": "PERSONNEL",
              "accountStatus": "VERIFIED"
            },
            "profession": {
              "id": 23,
              "created_at": "2024-07-26T14:35:51.370Z",
              "name": "IT professional",
              "status": "AVAILABLE"
            },
            "personnelProfession": {
              "employeeId": "6644990036",
              "experienceYears": 6,
              "employerName": "Janet Ofori",
              "employerEmail": "george.asiedu@aol.com",
              "personnelId": 1,
              "currentPosition": "EXPERT"
            },
            "totalProjects": 2
          }
        }
      }
    }
  }
}

export const swaggerFindPersonnelValidationError = {
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