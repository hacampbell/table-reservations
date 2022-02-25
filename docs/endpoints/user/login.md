# Login

Generates and sends back access and refresh tokens for a user given a valid username and password

METHOD: `POST`

URL: `http://localhost:3000/user/login`

Data Constraints
```json
{
  "username": "[a valid username]",
  "password": "[a valid password]"
}
```

Data Example
```json
{
  "username": "Henry",
  "password": "Password123"
}
```

## Success Rsponse

Condition: A valid username and password were sent to the server

Code: `200 OK`

Content Example
```json
{
    "message": "Logged in",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkhlbnJ5IiwiaWF0IjoxNjQ1NzYzNTg4LCJleHAiOjE2NDU3NjQ0ODh9.T6ngoOJgtDF7VZY7MrWkQdqvuehMx-F5fNDGNxgtUNE",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkhlbnJ5IiwiaWF0IjoxNjQ1NzYzNTg4fQ.GFf45iEWdd4LXFogEl5ERpQYn2z6Qt_eToysWlFrKuA"
}
```

## Error Responses

Condition: The user does not exist

Code: `404 Not Found`

Content Example

```json
{
    "message": "User not found"
}
```

**OR**

Condition: The users password is wrong

Code: `403 Forebidden`

Content Example

```json
{
    "message": "Incorrect password"
}
```

