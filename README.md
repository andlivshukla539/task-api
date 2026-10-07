# Task API

A beginner-friendly REST API for managing a simple To-Do task list. 

## Features
- In-memory data storage (no external database required).
- Full CRUD (Create, Read, Update, Delete) operations.
- Built-in interactive API documentation using Swagger UI.
- Simple, clear error handling.

> **Note**: Because this API uses an in-memory array, all data disappears and is reset to the initial 3 tasks whenever you restart the server.

## Tech Stack
- **Node.js**: JavaScript runtime
- **Express**: Web framework for building the API
- **swagger-ui-express**: For serving the OpenAPI/Swagger documentation

## Installation

1. Clone the repository or navigate to the project directory:
   ```bash
   cd task-api
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```

## How to Run the Server

To start the server, run:
```bash
npm start
```
By default, the server runs on `http://localhost:3000`.

To start the server in development mode (with auto-reload using `--watch`):
```bash
npm run dev
```

## API Endpoint Table

| Method | Endpoint      | Description                          |
|--------|---------------|--------------------------------------|
| GET    | `/`           | Get basic API information            |
| GET    | `/health`     | Check the API health                 |
| GET    | `/tasks`      | Get all tasks                        |
| GET    | `/tasks/:id`  | Get a specific task by its ID        |
| POST   | `/tasks`      | Create a new task                    |
| PUT    | `/tasks/:id`  | Update a task's title and/or status  |
| DELETE | `/tasks/:id`  | Delete a task by its ID              |

## Swagger UI
You can view and test the API directly from your browser! Once the server is running, go to:
[http://localhost:3000/docs](http://localhost:3000/docs)

## Example Requests and Responses

### GET all tasks
**Request:**
```bash
curl -i http://localhost:3000/tasks
```
**Response:**
```json
[
  { "id": 1, "title": "Learn Node.js", "done": false },
  { "id": 2, "title": "Build a REST API", "done": true },
  { "id": 3, "title": "Write documentation", "done": false }
]
```

### POST a new task
**Request:**
```bash
curl -i -X POST http://localhost:3000/tasks \
-H "Content-Type: application/json" \
-d '{"title":"Buy milk"}'
```
**Response:** (201 Created)
```json
{
  "id": 4,
  "title": "Buy milk",
  "done": false
}
```

### PUT (Update) a task
**Request:**
```bash
curl -i -X PUT http://localhost:3000/tasks/1 \
-H "Content-Type: application/json" \
-d '{"title":"Learn Node.js quickly", "done": true}'
```
**Response:** (200 OK)
```json
{
  "id": 1,
  "title": "Learn Node.js quickly",
  "done": true
}
```

### DELETE a task
**Request:**
```bash
curl -i -X DELETE http://localhost:3000/tasks/1
```
**Response:** (204 No Content - empty body)

## Project Structure
```
task-api/
├── package.json   # NPM dependencies and scripts
├── server.js      # Main Express application logic
├── openapi.json   # Swagger API definitions
├── README.md      # This file
└── .gitignore     # Files ignored by Git
```
