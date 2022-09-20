import { Router } from "express";
import { CreateUserController } from "./User/CreateUser/CreateUserController";
import { DeleteOneUserController } from "./User/DeleteOneUserById/DeleteUserController";
import { FindAllUserController } from "./User/FindAllUser/FindAllUserController";
import { FindOneUserByIdController } from "./User/FindOneUserById/FindOneUserByIdController";

const route = Router();
const createUserRoute = new CreateUserController();
const findAllUserRoute = new FindAllUserController();
const findOneUserByIdRoute = new FindOneUserByIdController();
const deleteOneUserRoute = new DeleteOneUserController();

route.post("/user", createUserRoute.handle);
route.get("/user/:id", findOneUserByIdRoute.handle);
route.get("/user", findAllUserRoute.handle);
route.delete("/user/:id", deleteOneUserRoute.handle);

export { route };
