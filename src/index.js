const express = require("express");
const cors = require("cors");

const { v4: uuid } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;

  const user = users.find((user) => user.username === username);

  if (!user) return response.status(400).json({ error: "Username not found!" });

  return next();
}

app.post("/users", (request, response) => {
  const { name, username } = request.body;

  const user = users.find((user) => user.username === username);

  if (user) return response.status(400).json({ error: "Username not found!" });

  users.push({
    id: uuid(),
    name,
    username,
    todo: [],
  });

  return response.status(201).json({ message: "Usuario criado com sucesso!" });
});

app.get("/todo", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.post("/todo", checksExistsUserAccount, (request, response) => {
  // Complete aqui
  // {
  //   id: 'uuid', // precisa ser um uuid
  //   title: 'Nome da tarefa',
  //   done: false,
  //   deadline: new Date(deadline),
  //   created_at: new Date()
  // }
});

app.put("/todo/:id", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch("/todo/:id/done", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete("/todo/:id", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;
