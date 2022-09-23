import { Request, Response, Router } from "express";
import { ensureAdmin } from "./Middleware/authAdmin";
import { ensureAuthenticate } from "./Middleware/authMiddleware";
import { CreateCreditTransactionController } from "./Transaction/CreateCreditTransaction/CreateCreditTransactionControllet";
import { CreateDebitTransactionController } from "./Transaction/CreateDebitTransaction/CreateDebitTransactionControllet";
import { CreateReverseTransactionController } from "./Transaction/CreateReverseTransaction/CreateReverseTransactionControllet";
import { DeleteTransactionController } from "./Transaction/DeleteTransaction/DeleteTransactionControllet";
import { FindAllTransactionByUserIdController } from "./Transaction/FindAllTransactionByUserId/FindAllTransactionByUserIdController";
import { ReportAllTransactionByUserIdController } from "./Transaction/ReportAllTransactionByUserId/ReportAllTransactionByUserIdController";
import { ReportLastTransactionByUserIdController } from "./Transaction/ReportLastTransactionByUserId/ReportLastTransactionByUserIdController";
import { ReportMonthYearTransactionByUserIdController } from "./Transaction/ReportMonthYearTransactionByUserId/ReportMonthYearTransactionByUserIdController";
import { CreateUserController } from "./User/CreateUser/CreateUserController";
import { DeleteUserController } from "./User/DeleteUser/DeleteUserController";
import { FindAllUserController } from "./User/FindAllUser/FindAllUserController";
import { FindOneUserByIdController } from "./User/FindOneUserById/FindOneUserByIdController";
import { LoginController } from "./User/Login/LoginController";
import { TotalBalanceController } from "./User/TotalBalance/TotalBalanceController";
import { UpdateOpeningBalanceController } from "./User/UpdateOpeningBalance/UpdateOpeningBalanceController";

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
const reportMonthYearTransactionByUserIdRoute =
  new ReportMonthYearTransactionByUserIdController();
const reportLastTransactionByUserIdRoute =
  new ReportLastTransactionByUserIdController();
const updateOpeningBalanceController = new UpdateOpeningBalanceController();
const totalBalanceController = new TotalBalanceController();

// User Routes
route.post("/user", createUserRoute.handle);
route.get(
  "/user/:id",
  ensureAuthenticate,
  ensureAdmin,
  findOneUserByIdRoute.handle
);
route.get("/user", ensureAuthenticate, ensureAdmin, findAllUserRoute.handle);
route.delete(
  "/user/:id",
  ensureAuthenticate,
  ensureAdmin,
  deleteUserRoute.handle
);
route.get("/user/:id/total", totalBalanceController.handle);
route.post("/login", loginRoute.handle);

// Transaction Routes
route.post("/transaction/debit/:id", createDebitTransactionRoute.handle);
route.post("/transaction/credit/:id", createCreditTransactionRoute.handle);
route.post("/transaction/reverse/:id", createReverseTransactionRoute.handle);
route.get("/transaction/:id", findAllTransactionByIdUserRoute.handle);
route.get(
  "/transaction/report/:id/:month/:year",
  reportMonthYearTransactionByUserIdRoute.handle
);
route.get(
  "/transaction/report/:id/last",
  reportLastTransactionByUserIdRoute.handle
);
route.get("/transaction/report/:id", reportAllTransactionByUserIdRoute.handle);
route.delete("/transaction/:id", deleteTransactionRoute.handle);

// Opening Balance route
route.put(
  "/openingBalance",
  ensureAuthenticate,
  ensureAdmin,
  updateOpeningBalanceController.handle
);
route.use((request: Request, response: Response) =>
  response.status(404).json()
);

export { route };
