import { Router as RouterExpress } from "express";
import { Router as usersRoute } from "./controllers/usersControllers.js";
import { Router as categoriesRoute } from "./controllers/categoriesControllers.js";
import { Router as transactionsRoute } from "./controllers/transactionsController.js";
const Router = RouterExpress();

Router.use('/users', usersRoute);

Router.use('/categories', categoriesRoute);

Router.use('/transactions', transactionsRoute);

export { Router };