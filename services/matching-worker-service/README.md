# Matching Worker Service

## Architecture

The high-level architecture of the matching service is decribed [here](../matching-service/README.md#architecture).

This service is a Node.js application interfacing with a running RabbitMQ work queue using `amqplib` and a running PostgreSQL database using Prisma ORM.

## Getting Started

Follow these steps to run this service locally.

### Prerequisites

_Preferred setup method is via docker compose._

- Docker Desktop
- (optional, highly recommended) database tool with support for PostgreSQL, i.e. DataGrip

### Steps

1. Clone the project root repository.
2. `cd` into the project directory, and then `cd` into `Server-Configs/Without-K8/dev`.
3. Build the service by running `docker compose up --build matching-worker-service`, then wait for the container to start up.

To obtain a view of the PostgreSQL database, start your database tool and connect to `postgresql://root:secret@matching-service-db:5432/matching_service?schema=public`.

To see the RabbitMQ management UI, go to `localhost:15672` and log in with username: `guest`, and password: `guest`.

## Matching workflow + logic

1. Insert match request into `MatchRequest` table
2. Query database for match request with the following conditions:
   - Same complexity level
   - Not expired (calculated via timestamp difference, now - createdAt < 30s)
   - Not fulfilled
   - Does not belong to the same user (user ID)
   - Shares at least 1 common language
3. If a match is found, return the pair of user IDs, complexity level, and a shared language to both callback queues (by correlation id)
   - Update both requests to be fulfilled in the database
   - Insert a match into `Match` table
4. If a match is not found, do nothing

## Documentation

- [Prisma ORM client reference](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)
- [RabbitMQ RPC pattern tutorial](https://www.rabbitmq.com/tutorials/tutorial-six-javascript.html)
- [RabbitMQ Direct Reply-to tutorial](https://www.rabbitmq.com/direct-reply-to.html)
