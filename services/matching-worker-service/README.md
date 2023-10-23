# Match Worker Service

## Prerequisites

- node:18
- postgres:16
- rabbitmq:latest
- a locally running instance of `matching-service`

## Running locally

1. Run `npm i` to install all dependencies.
2. Create a `.env` file with the following field: DATABASE_URL="postgresql://{user}:{password}@{host}:{port}/matching_service?schema=public"
3. Run `npx prisma migrate dev` to set up the database.
4. Run `npm run dev`.

## Running with docker-compose

`docker-compose up --build matching-worker-service`

## Matching workflow + logic

1. Insert match request into database
2. Query database for match request with the following conditions:
   - Same complexity level
   - Not cancelled
   - Not expired (calculated via timestamp difference, now - createdAt < 30s)
   - Not fulfilled
   - Does not belong to the same user (user ID)
3. If a match is found, return the pair of user IDs and complexity level to both callback queues (by correlation id)
   - Update both requests to be fulfilled in the database
4. If a match is not found, do nothing
