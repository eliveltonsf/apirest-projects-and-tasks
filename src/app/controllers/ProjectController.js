import fs from "fs";
import data from "../../../data.json";

function writeData(data) {
  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) {
      console.log(`[SERVER] Write file error: ${err}`);
    }
  });
}

let counter = 1;

function returnIndex(id) {
  let position;

  data.projects.forEach((project, index) => {
    if (project.id == id) {
      position = index;
    }
  });

  return position;
}

function returnLastUsedId() {
  let lastId;

  data.projects.forEach((project, index) => {
    if (index == data.projects.length - 1) {
      lastId = project.id || 0;
    }
  });

  return lastId;
}

class ProjectController {
  index(req, res) {
    return res.json(data.projects);
  }

  store(req, res) {
    const { title, tasks } = req.body;

    const returnFuncition = returnLastUsedId() + 1;

    const id = returnFuncition ? returnFuncition : 1;

    const projectExists = returnIndex(id);

    if (projectExists !== undefined) {
      return res.status(400).json({ error: "Project alredy exists." });
    }

    const newProject = {
      id,
      title: title,
      tasks: tasks,
    };

    data.projects.push(newProject);

    writeData(data);

    return res.json({ Message: "Project created!" });
  }

  update(req, res) {
    const id = req.params.id;
    const { title } = req.body;

    const position = returnIndex(id);

    if (position === undefined) {
      return res.status(400).json({ error: "Project does not exists." });
    }

    data.projects[position].title = title;

    writeData(data);

    return res.json({ Message: "Project updated!" });
  }

  delete(req, res) {
    const id = req.params.id;

    const position = returnIndex(id);

    if (position === undefined) {
      return res.status(400).json({ error: "Project does not exists." });
    }

    data.projects.splice(position, 1);

    writeData(data);

    return res.json({ Message: "Project deleted!" });
  }
}

export default new ProjectController();
