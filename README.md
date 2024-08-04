# My Car Value API Documentation

Welcome to the My Car Value API documentation. This backend, built using NestJS, facilitates a network for clients looking to sell their cars.

## Project Goal

The primary goal of the My Car Value project is to create a platform where clients can easily connect and sell their vehicles. This API provides the necessary backend functionality to support user authentication, vehicle report creation, and more.

## Technologies Used

- **NestJS**
- **TypeScript**
- **SQLite**
- **TypeORM**

## Security Measures

- **Session IDs and Cookies**: Used for maintaining user sessions securely.
- **Salted and Hashed Passwords**: Ensures that passwords are stored securely.
- **Interceptors**: Hide sensitive properties and provide additional security layers.

## Authentication Endpoints

### Create a new user

```http
POST http://localhost:3000/auth/signup
Content-Type: application/json

{
  "email": "test1@test.com",
  "password": "12345"
}
```

### Sign in as an existing user

POST http://localhost:3000/auth/signin

Content-Type: application/json

```{
  "email": "test@test.com",
  "password": "12345"
}
```

### Get the currently signed in user

GET http://localhost:3000/auth/whoami

### Sign out

POST http://localhost:3000/auth/signout

### Find a particular user with a given ID

GET http://localhost:3000/auth/:id

### Find all users with a given email

GET http://localhost:3000/auth?email=

### Delete a user given id

DELETE http://localhost:3000/auth/:id

### Update a user

PATCH http://localhost:3000/auth/:id

- Content-Type: application/json

```
{
"password": "pw"
}
```

## Report Endpoints

### Create a report

POST http://localhost:3000/reports
Content-Type: application/json

```
{
"make": "ford",
"model": "mustang",
"year": 1990,
"mileage": 10000,
"lng": 45,
"lat": 45,
"price": 20000
}
```

### Approve an existing report

PATCH http://localhost:3000/reports/:id

Content-Type: application/json

- Note: Only users with **admin** permissions can approve reports.

```
{
"approved": true
}
```

### Get an estimate for an existing vehicle

GET http://localhost:3000/reports?make=toyota&model=corolla&lng=0&lat=0&mileage=10000&year=1989
