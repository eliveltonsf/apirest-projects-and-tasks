import { projects } from "./ProjectController";

class TaskController {
  store(req, res) {
    const id = req.params.id;
    const { task } = req.body;

    for (let i = 0; i < projects.length; i++) {
      if (projects[i].id == id) {
        projects[i].tasks.push(task);
      }
    }

    return res.json({ Message: "Tarefa incluida no projeto!" });
  }
}

export default new TaskController();
