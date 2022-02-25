# Register

Registers a new user in the system, if the given username does not already exist, which can be then used to login.

METHOD: `POST`

URL: `http://localhost:3000/user/register`

Data Constraints
```json
{
  "username": "[3 - 15 alphanumeric characters]",
  "email": "[RFC 5322 complaiant email]",
  "password": "[8 - 25 alphanumeric characters, with 1 number and capital letter]"
}
```

Data Example
```json
{
  "username": "Henry",
  "email": "henry@dbt.com",
  "password": "Password123"
}
```

## Success Rsponse

Condition: All data entered meets validation requirements, and no user of the given username already exists.

Code: `201 Created`

Content Example
```json
{
    "message": "User Created"
}
```

## Error Response

Condition: A user already exists with the given username, or an invalid username was given, or an invalid email was given, or an invalid password was given.

Code: `400 Bad Request`

Content Example

_The servers response will consist of the message element, and some variation of the errors contained in the error element depending on the data entered_
```json
{
    "message": "Unable to create new user. Bad data sent to server.",
    "error": [
        "The username you entered has already been taken.",
        "Invalid email entered.",
        "Invalid password entered. Passwords must be between 8 & 25 characters in length, contain only letters and numbers with at least one capital letter and at least one number"
    ]
}
```