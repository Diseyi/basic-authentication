# Simple Authentication in express

This is a basic authentication API built with Express. It provides key features for user authentication and token management.
## Key Features
- Signup: Users can sign up by providing their email and password.
- Login: Users can authenticate themselves by providing their email and password.
- Token Generation: The API supports the generation of access tokens and refresh tokens. When a new token is generated, the previously stored refresh token is deleted from the database. This adds an extra layer of security by ensuring that each refresh token can only be used once to request an access token.
- Token Deletion: When a user logs out, the refresh token associated with their session is deleted from the database. This ensures that the token cannot be used for further authentication.

## Usage 

To get started, run the following command:

```bash
git clone https://github.com/Diseyi/basic-authentication.git
cd basic-uthentication
npm install
npm run start
```

## Endpoints

The application has the following endpoints.

- `POST` **/signup**: This endpoint creates a new user.
- `POST` **/login**: This endpoint authenticates an existing user.
- `GET` **/users**: This endpoint gets all the list of users available.
- `PATCH` **/token**: This endpoint is used to get new access token.
- `PATCH` **/token/:id**: This endpoint deletes the refresh token from the database.

Using curl client we can make requests to the running application.

### Create User

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{ "email": "caramel@gmail.com", "password": "password1" }' \
  http://localhost:4040/api/auth/signup
```

Response:
```json
{
  "status": "success",
  "message": "User successfully created!",
  "data": {
    "email": "caramel@gmail.com",
    "id": "c1a1babe-9f0d-4054-9ec7-263eab219fea",
    "createdAt": "2023-05-17T14:08:37.237Z",
    "updatedAt": "2023-05-17T14:08:37.237Z"
  }
}
```

### Login

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{ "email": "caramel@gmail.com", "password": "password1" }' \
  http://localhost:4040/api/auth/login
```

Response:

```json
{
  "status": "success",
  "message": "User login successful!",
  "data": {
    "email": "caramel@gmail.com",
    "id": "c1a1babe-9f0d-4054-9ec7-263eab219fea",
    "createdAt": "2023-05-17T14:08:37.237Z",
    "updatedAt": "2023-05-17T14:08:37.237Z",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMxYTFiYWJlLTlmMGQtNDA1NC05ZWM3LTI2M2VhYjIxOWZlYSIsImVtYWlsIjoiY2FyYW1lbEBnbWFpbC5jb20iLCJpYXQiOjE2ODQzMzI2NDEsImV4cCI6MTY4NDMzMzI0MX0.Nz9CfDzccHz3AfTQo1RJjMyJ0-ZwNADLjEQcsG4sMYY",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMxYTFiYWJlLTlmMGQtNDA1NC05ZWM3LTI2M2VhYjIxOWZlYSIsImVtYWlsIjoiY2FyYW1lbEBnbWFpbC5jb20iLCJpYXQiOjE2ODQzMzI2NDEsImV4cCI6MTY4NTE5NjY0MX0.ECBjaLsDDPYIsrAnpOebEg5n9oCNFcTdRJ-Xtp0mejs"
  }
}
```

### Get new acess token

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNjODU1ODY4LTcwNDctNDU4NC04MzA4LTUzMDBiNjIyY2JhNCIsImVtYWlsIjoic3VzYW5AZ21haWwuY29tIiwiaWF0IjoxNjg0MzI2Mzk1LCJleHAiOjE2ODUxOTAzOTV9.kaMczvXeTFLxF7Cl8ZlHdXN9dJ6VdSY1bq7vJbYw6R4"}' \
  http://localhost:4040/api/auth/token
```

Response:

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMxYTFiYWJlLTlmMGQtNDA1NC05ZWM3LTI2M2VhYjIxOWZlYSIsImVtYWlsIjoiY2FyYW1lbEBnbWFpbC5jb20iLCJpYXQiOjE2ODQzMzI4MTIsImV4cCI6MTY4NDMzMzQxMn0.Krq8TPh3mMSu1Yzs_QD5kCwgYAXrJF5drBVX3W1ehXI",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMxYTFiYWJlLTlmMGQtNDA1NC05ZWM3LTI2M2VhYjIxOWZlYSIsImVtYWlsIjoiY2FyYW1lbEBnbWFpbC5jb20iLCJpYXQiOjE2ODQzMzI4MTIsImV4cCI6MTY4NTE5NjgxMn0.kNj6U8eYZK8_s9SMEo1zzI81A_l1V56xTcevJm7S8XY"
}
```

### Delete token

```bash
 curl -X PATCH  \
   -H "Content-Type: application/json"
    http://localhost:4040/api/auth/token/c1a1babe-9f0d-4054-9ec7-263eab219fea
```

Response: 

```json
{
  "message": "Successsful"
}
```

### Get user

```bash
 curl -X GET  
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMxYTFiYWJlLTlmMGQtNDA1NC05ZWM3LTI2M2VhYjIxOWZlYSIsImVtYWlsIjoiY2FyYW1lbEBnbWFpbC5jb20iLCJpYXQiOjE2ODQzMzI2NDEsImV4cCI6MTY4NDMzMzI0MX0.Nz9CfDzccHz3AfTQo1RJjMyJ0-ZwNADLjEQcsG4sMYY" \
   http://localhost:4040/api/auth/users
```

Response: 

```json
{
  "message": "Welcome John Doe"
}
```
