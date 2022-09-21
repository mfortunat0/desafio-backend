import { Request, Response, Router } from "express";
import { ensureAdmin } from "./middleware/authAdmin";
import { CreateCreditTransactionController } from "./Transaction/CreateCreditTransaction/CreateCreditTransactionControllet";
import { CreateDebitTransactionController } from "./Transaction/CreateDebitTransaction/CreateDebitTransactionControllet";
import { CreateReverseTransactionController } from "./Transaction/CreateReverseTransaction/CreateReverseTransactionControllet";
import { DeleteTransactionController } from "./Transaction/DeleteTransaction/DeleteTransactionControllet";
import { FindAllTransactionByUserIdController } from "./Transaction/FindAllTransactionByUserId/FindAllTransactionByUserIdController";
import { ReportAllTransactionByUserIdController } from "./Transaction/ReportAllTransactionByUserId/ReportAllTransactionByUserIdController";
import { CreateUserController } from "./User/CreateUser/CreateUserController";
import { DeleteUserController } from "./User/DeleteUser/DeleteUserController";
import { FindAllUserController } from "./User/FindAllUser/FindAllUserController";
import { FindOneUserByIdController } from "./User/FindOneUserById/FindOneUserByIdController";
import { LoginController } from "./User/Login/LoginController";

const route = Router();
const createUserRoute = new CreateUserController();
const findAllUserRoute = new FindAllUserController();
const findOneUserByIdRoute = new FindOneUserByIdController();
const deleteUserRoute = new DeleteUserController();
const loginRoute = new LoginController();
const createDebitTransactionRoute = new CreateDebitTransactionController();
const createCreditTransactionRoute = new CreateCreditTransactionController();
const createReverseTransactionRoute = new CreateReverseTransactionController();
const findAllTransactionByIdUserRoute =
  new FindAllTransactionByUserIdController();
const deleteTransactionRoute = new DeleteTransactionController();
const reportAllTransactionByUserIdRoute =
  new ReportAllTransactionByUserIdController();

// User Routes
route.post("/user", createUserRoute.handle);
route.get("/user/:id", ensureAdmin, findOneUserByIdRoute.handle);
route.get("/user", ensureAdmin, findAllUserRoute.handle);
route.delete("/user/:id", ensureAdmin, deleteUserRoute.handle);
route.post("/login", loginRoute.handle);

// Transaction Routes
route.post("/transaction/debit/:id", createDebitTransactionRoute.handle);
route.post("/transaction/credit/:id", createCreditTransactionRoute.handle);
route.post("/transaction/reverse/:id", createReverseTransactionRoute.handle);
route.get("/transaction/:id", findAllTransactionByIdUserRoute.handle);
route.get("/transaction/report/:id", reportAllTransactionByUserIdRoute.handle);
route.delete("/transaction/:id", deleteTransactionRoute.handle);

route.use((request: Request, response: Response) =>
  response.status(404).json()
);

export { route };
