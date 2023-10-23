# Matching Service

## Prerequisites

- node:18
- rabbitmq:latest

## Running locally

1. Run `npm i` to install all dependencies.
2. Run `npm run dev`.

## Running with docker-compose

`docker-compose up --build matching-service`

## Architecture

The Matching Service is an event-driven service that uses Socket.io for client-server duplex communication. Socket.io is chosen for its simplicity, as compared to alternative solutions such as Webhooks.

The "service" actually consists of three differing services that work in isolation, namely the API layer (this service), a message queue, and a matching worker that does the work of finding a match. These services follow a modified RPC pattern as described [here](https://www.rabbitmq.com/tutorials/tutorial-six-javascript.html) and [here](https://www.rabbitmq.com/direct-reply-to.html). The API layer does not know of the existence of the matching worker and vice versa, and both consume and publish from and to the same queueing service.
