let projects = [];
export { projects };

let counter = 1;

class ProjectController {
  index(req, res) {
    return res.json(projects);
  }

  store(req, res) {
    const { title, tasks } = req.body;

    const id = counter;

    for (let i = 0; i < projects.length; i++) {
      if (projects[i].id == id) {
        return res.status(400).json({ error: "Project alredy exists." });
      }
    }

    projects.push({
      id,
      title: title,
      tasks: tasks,
    });

    counter++;

    return res.json({ Message: "Projeto cadastrado!" });
  }

  update(req, res) {
    const id = req.params.id;
    const { title } = req.body;

    const position = id - 1;

    if (position >= projects.length) {
      return res.status(400).json({ error: "Project does not exists." });
    }

    projects[position].title = title;

    return res.json({ Message: "Projeto atualizado!" });
  }

  delete(req, res) {
    const id = req.params.id;

    const index = projects.length + 1;

    if (id >= index) {
      return res.status(400).json({ error: "Project does not exists." });
    }

    for (let i = 0; i < projects.length; i++) {
      if (projects[i].id == id) {
        projects.splice(i, 1);
      }
    }

    return res.json({ Message: "Projeto deletado" });
  }
}

export default new ProjectController();
