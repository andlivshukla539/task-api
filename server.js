const express = require('express');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Load OpenAPI specification
const openapiDocument = JSON.parse(fs.readFileSync(path.join(__dirname, 'openapi.json'), 'utf8'));

// Swagger UI configuration
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiDocument));

// In-memory data store
let tasks = [
  { id: 1, title: "Learn Node.js", done: false },
  { id: 2, title: "Build a REST API", done: true },
  { id: 3, title: "Write documentation", done: false }
];

let nextId = 4;

// 1. GET /
app.get('/', (req, res) => {
  res.json({
    name: "Task API",
    version: "1.0",
    endpoints: ["/tasks"]
  });
});

// 2. GET /health
app.get('/health', (req, res) => {
  res.json({ status: "ok" });
});

// 3. GET /tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// 4. GET /tasks/:id
app.get('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ error: `Task ${id} not found` });
  }

  res.json(task);
});

// 5. POST /tasks
app.post('/tasks', (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTask = {
    id: nextId++,
    title: title.trim(),
    done: false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// 6. PUT /tasks/:id
app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const taskIndex = tasks.findIndex(t => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: `Task ${id} not found` });
  }

  const { title, done } = req.body;

  // Check if body is empty or invalid (neither title nor done provided)
  if (Object.keys(req.body).length === 0 || (title === undefined && done === undefined)) {
    return res.status(400).json({ error: "Request body must contain 'title' or 'done'" });
  }
  
  if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
     return res.status(400).json({ error: "Title cannot be empty" });
  }

  const updatedTask = { ...tasks[taskIndex] };

  if (title !== undefined) {
    updatedTask.title = title.trim();
  }
  if (done !== undefined) {
    updatedTask.done = Boolean(done);
  }

  tasks[taskIndex] = updatedTask;
  res.json(updatedTask);
});

// 7. DELETE /tasks/:id
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const taskIndex = tasks.findIndex(t => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: `Task ${id} not found` });
  }

  tasks.splice(taskIndex, 1);
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger UI is available at http://localhost:${PORT}/docs`);
});
