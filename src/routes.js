import express, { Router } from "express";

import ProjectController from "./app/controllers/ProjectController";

const routes = new Router();
routes.use(express.json());

function insertTask(id, task) {
  for (let i = 0; i < projects.length; i++) {
    if (projects[i].id == id) {
      projects[i].tasks.push(task);
    }
  }
}

routes.get("/projects", ProjectController.index);

routes.post("/projects", ProjectController.store);

routes.put("/projects/:id", ProjectController.update);

routes.delete("/projects/:id", ProjectController.delete);

routes.post("/projects/:id/tasks", (req, res) => {
  const id = req.params.id;
  const { task } = req.body;
  insertTask(id, task);
  return res.json({ Message: "Tarefa incluida no projeto!" });
});

export default routes;
