import { Router } from "express";
import bodyParser from "body-parser";

const routes = new Router();
routes.use(bodyParser.json());

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

export default routes;
