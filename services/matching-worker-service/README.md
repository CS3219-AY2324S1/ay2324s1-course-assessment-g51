# Matching Worker Service

## Architecture

The high-level architecture of the matching service is decribed [here](../matching-service/README.md#architecture).

This service is a Node.js application interfacing with a running RabbitMQ work queue using `amqplib` and a running PostgreSQL database using Prisma ORM.

## Getting Started

Follow these steps to run this service locally.

### Prerequisites

_Preferred setup method is via docker compose._

- Docker Desktop

### Steps

1. Clone the project root repository.
2. `cd` into the project directory.
3. Build the service by running `docker compose up --build matching-worker-service`, then wait for the container to start up.

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
