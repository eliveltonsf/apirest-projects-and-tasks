import { projects } from "../controllers/ProjectController";

export default async (req, res, next) => {
  let position;

  projects.forEach((project, index) => {
    if (project.id == id) {
      position = index;
    }
  });

  if (position === undefined) {
    return res.status(400).json({ error: "Project does not exists." });
  }

  return next();
};
