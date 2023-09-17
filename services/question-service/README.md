# PeerPrep Question Service

Description: The PeerPrep Question Service is a service written for efficient retrieval of question data and metadata from a database.

Requirements:

- Docker
- Node v18

To start development locally:

- Run `docker-compose up`, or `docker-compose up -d` to run docker-compose in the background.
- Changes in `src/*.ts` will cause re-transpilation and hot reloading in the Docker container.

## APIs provided/to be implemented:

All endpoints are prefixed with `/api`

1. `GET /questions/:id`: gets a single question by question id
2. `GET /questions`: gets >= 0 questions according to the supplied parameters listed below
   1. `q`: query string
   2. `difficulty`: difficulty of the question
