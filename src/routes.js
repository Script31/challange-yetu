const { Router } = require("express");

const routes = Router();

const authMiddlewares = require("./app/middlewares/auth");
const UserController = require("./app/Controllers/UserController");
const SessionController = require("./app/Controllers/SessionController");
const CarsController = require("./app/Controllers/CarsController");

routes.post("/user", UserController.store);
routes.post("/session", SessionController.store);

/**
 * thoses router dont need permissions
 */

routes.get("/cars", CarsController.findAll);
routes.get("/cars/:id", CarsController.find);

/**
 * middlewares or permissions
 */

routes.use(authMiddlewares);

/**
 * Cars crud
 */
routes.post("/cars", CarsController.store);
routes.put("/cars/:id", CarsController.update);
routes.delete("/cars/:id", CarsController.delete);

module.exports = routes;
