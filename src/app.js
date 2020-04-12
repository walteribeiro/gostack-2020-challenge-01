const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex((item) => item.id === id);

  if (repositoryIndex >= 0) {
    const repository = {
      id,
      title,
      url,
      techs,
      likes: repositories[repositoryIndex].likes,
    };

    repositories[repositoryIndex] = repository;

    return response.json(repository);
  } else {
    return response.status(400).send();
  }
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex((item) => item.id === id);

  if (repositoryIndex >= 0) {
    repositories.splice(repositoryIndex, 1);
    return response.status(204).send();
  } else {
    return response.status(400).send();
  }
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex((item) => item.id === id);

  if (repositoryIndex >= 0) {
    repositories[repositoryIndex].likes += 1;
    return response.json(repositories[repositoryIndex]);
  } else {
    return response.status(400).send();
  }
});

module.exports = app;
