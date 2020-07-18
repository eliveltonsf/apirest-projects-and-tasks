import express, { Router } from "express";
import bodyParser from "body-parser";

const routes = new Router();
routes.use(express.json());

let projects = [];

function createProjects(title, tasks) {
  const counter = projects.length;
  projects.push({
    id: counter + 1,
    title: title,
    tasks: tasks,
  });
}

function updateProjects(id, title) {
  const position = id - 1;
  projects[position].title = title;
}

function deleteProject(id) {
  for (let i = 0; i < projects.length; i++) {
    if (projects[i].id == id) {
      projects.splice(i, 1);
    }
  }
}

function insertTask(id, task) {
  for (let i = 0; i < projects.length; i++) {
    if (projects[i].id == id) {
      projects[i].tasks.push(task);
    }
  }
}

routes.get("/projects", async (req, res) => {
  return await res.json(projects);
});

routes.post("/projects", (req, res) => {
  const { title, tasks } = req.body;
  createProjects(title, tasks);
  console.log(title, tasks);
  return res.json({ Message: "Projeto cadastrado!" });
});

routes.put("/projects/:id", (req, res) => {
  const id = req.params.id;
  const { title } = req.body;
  updateProjects(id, title);
  return res.json({ Message: "Projeto atualizado!" });
});

routes.delete("/projects/:id", (req, res) => {
  const id = req.params.id;
  deleteProject(id);
  return res.json({ Message: "Projeto deletado" });
});

routes.post("/projects/:id/tasks", (req, res) => {
  const id = req.params.id;
  const { task } = req.body;
  insertTask(id, task);
  return res.json({ Message: "Tarefa incluida no projeto!" });
});

export default routes;
