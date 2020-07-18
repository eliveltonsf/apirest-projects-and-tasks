let projects = [];
export { projects };

class ProjectController {
  index(req, res) {
    return res.json(projects);
  }

  store(req, res) {
    const { title, tasks } = req.body;
    const counter = projects.length;

    projects.push({
      id: counter + 1,
      title: title,
      tasks: tasks,
    });

    return res.json({ Message: "Projeto cadastrado!" });
  }

  update(req, res) {
    const id = req.params.id;
    const { title } = req.body;

    const position = id - 1;
    projects[position].title = title;

    return res.json({ Message: "Projeto atualizado!" });
  }

  delete(req, res) {
    const id = req.params.id;

    for (let i = 0; i < projects.length; i++) {
      if (projects[i].id == id) {
        projects.splice(i, 1);
      }
    }

    return res.json({ Message: "Projeto deletado" });
  }
}

export default new ProjectController();
