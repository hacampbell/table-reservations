# Token

Generates a new access token given a valid refresh token.

METHOD: `POST`

URL: `http://localhost:3000/user/token`

Data Constraints
```json
{
  "refreshToken": "[a valid refresh token]"
}
```

Data Example
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkhlbnJ5IiwiaWF0IjoxNjQ1NzYzNTg4fQ.GFf45iEWdd4LXFogEl5ERpQYn2z6Qt_eToysWlFrKuA"
}
```

## Success Rsponse

Condition: A valid refresh token is sent to the server

Code: `200 OK`

Content Example
```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRlbW8iLCJpYXQiOjE2NDU3NjYzNzMsImV4cCI6MTY0NTc2NzI3M30.gNRb3IZH-aJGit46OPRRXVKlFpsd0dpTmoqWrB1eQ1I"
}
```

## Error Responses

Condition: An invalid refresh token is sent to the server

Code: `403 Forebidden`

Content Example

```json
{
    "message": "Invalid refresh token"
}
```

**OR**

Condition: No refresh token is sent to the server

Code: `400 Bad Request`

Content Example

```json
{
    "message": "No refresh token sent to server"
}
```

