import * as express from "express";
import { UserController } from "../controller/user.controller";

const Router = express.Router();

Router.get("/users", UserController.index);
Router.post("/add", UserController.store);
Router.get("/users/:id", UserController.show);
Router.put("/users/:id", UserController.update);
Router.delete("/users/:id", UserController.delete);

export { Router as apiRoute };
