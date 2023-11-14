# Profile Service

Profile management with Node.js, Express.js, PostgreSQL, TypeORM.

## Architecture

The service implements a REST API server using Express.js. It interfaces with a running instance of PostgreSQL database using TypeORM. TypeORM is also used for data modeling, validation, and query building.

The high-level architecture of the service can be described with this diagram:

![](./docs/diagrams/architecture-diagram.png)

The service follows a conventional Model-View-Controller design pattern:

![](./docs/diagrams/mvc-pattern.png)

## Getting Started

Follow these steps to run this service locally.

### Prerequisites

_Preferred setup method is via docker compose._

- Docker Desktop
- (optional, highly recommended) database tool with support for PostgreSQL, i.e. pgAdmin4

### Steps

1. Clone the project root repository.
2. `cd` into the project directory, and then `cd` into `Server-Configs/Without-K8/dev`.
3. Build the service by running `docker compose up --build profile-service`, then wait for the container to start up.

After running the above steps, the server will be available at [localhost:3100](localhost:3100). ******Visiting the url should return a 404 error status code - it means the server is running and responding to client requests.

To obtain a view of the postgreSQL database, start your database tool and connect to `*******`.

## API Reference

#### Create a profile

```http
POST /users/profile
```

with a JSON as request body payload:

| Attribute   | Type   | Description                      | Required |
| :---------- | :----- | :------------------------------- | :------- |
| `username`  | string | Unique username by users.        | yes      |
| `email`     | string | Users email used to sign up.     | yes      |
| `uid`       | string | Unique UID is given by firebase. | yes      |
| `firstName` | string | User's first name.               | yes      |
| `lastName`  | string | User's last name.                | yes      |
| `age`       | number | User's age.                      | yes      |

If successful, returns `201 Created` and the following response attributes:

```javascript
{
    "success": true,
    "message": "Success",
    "data": {}
}
```

In the data object, we have the following.

| Attribute   | Type   | Description                      |      |
| :---------- | :----- | :------------------------------- | :--- |
| `username`  | string | Unique username by users.        |
| `email`     | string | Users email used to sign up.     |
| `uid`       | string | Unique UID is given by firebase. |
| `firstName` | string | User's first name.               |
| `lastName`  | string | User's last name.                |
| `age`       | number | User's age.                      |

#### Get profile

```http
GET /users/profile/:uid
```

with the uid as query parameters:

If successful, returns `200 OK` and an array of JSON objects with the following attributes:

| Attribute   | Type   | Description                      |      |
| :---------- | :----- | :------------------------------- | :--- |
| `username`  | string | Unique username by users.        |
| `email`     | string | Users email used to sign up.     |
| `uid`       | string | Unique UID is given by firebase. |
| `firstName` | string | User's first name.               |
| `lastName`  | string | User's last name.                |
| `age`       | number | User's age.                      |

#### Update profile by uid

```http
PUT /users/profile/:uid
```

with the uid as route parameter:

with a JSON as request body payload:

| Attribute   | Type   | Description                      | Required |
| :---------- | :----- | :------------------------------- | :------- |
| `username`  | string | Unique username by users.        | yes      |
| `email`     | string | Users email used to sign up.     | yes      |
| `uid`       | string | Unique UID is given by firebase. | yes      |
| `firstName` | string | User's first name.               | yes      |
| `lastName`  | string | User's last name.                | yes      |
| `age`       | number | User's age.                      | yes      |

If successful, returns `200 OK` and a JSON object with the following attributes:


| Attribute   | Type   | Description                      |      |
| :---------- | :----- | :------------------------------- | :--- |
| `username`  | string | Unique username by users.        |
| `email`     | string | Users email used to sign up.     |
| `uid`       | string | Unique UID is given by firebase. |
| `firstName` | string | User's first name.               |
| `lastName`  | string | User's last name.                |
| `age`       | number | User's age.                      |

#### Delete profile by uid

```http
DELETE /users/profile/:uid
```

with the uid as route parameter:

If successful, returns `204 No Content`.
