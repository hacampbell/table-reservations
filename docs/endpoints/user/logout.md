# Logout

Invalidates a users refresh token by removing it from the database

METHOD: `DLETE`

URL: `http://localhost:3000/user/logout`

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

Code: `204 No Content`

Content Example
```json
{}
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

Code: `404 Bad Request`

Content Example

```json
{
    "message": "No refresh token sent to server"
}
```

