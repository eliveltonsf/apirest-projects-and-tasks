import { Router } from "express";
import bodyParser from "body-parser";

const routes = new Router();
routes.use(bodyParser.json());

export default routes;
