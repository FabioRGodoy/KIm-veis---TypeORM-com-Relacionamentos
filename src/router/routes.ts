import { Router } from "express";
import {
  createCategoriesController,
  getCategoriesController,
} from "../controllers/categoriesControllers";
import {
  createPropertiesController,
  getPropertiesController,
  getPropertiesFromCategoryController,
} from "../controllers/propertiesControllers";
import {
  createSchedulesController,
  getScheduleController,
} from "../controllers/schedules_user_propertiesControllers";
import {
  createUserController,
  deleteUserController,
  getAllUsersController,
  loginUserController,
  updateUserController,
} from "../controllers/userControllers";
import { virifyDateMiddleware } from "../middleweres/schedulesMiddleweres";
import {
  authTokenMiddleware,
  isAdmMiddlewere,
  verifyTokenMiddleware,
} from "../middleweres/userMiddleweres";

export const router = Router();

//USER

router.post("/users", createUserController);

router.post("/login", loginUserController);

router.get(
  "/users",
  authTokenMiddleware,
  isAdmMiddlewere,
  getAllUsersController
);

router.patch(
  "/users/:id",
  authTokenMiddleware,
  verifyTokenMiddleware,
  updateUserController
);

router.delete(
  "/users/:id",
  authTokenMiddleware,
  isAdmMiddlewere,
  deleteUserController
);

//Categories

router.post(
  "/categories",
  authTokenMiddleware,
  isAdmMiddlewere,
  createCategoriesController
);
router.get("/categories", getCategoriesController);

router.get("/categories/:id/properties", getPropertiesFromCategoryController);

//Properties

router.post(
  "/properties",
  authTokenMiddleware,
  isAdmMiddlewere,
  createPropertiesController
);
router.get("/properties", getPropertiesController);

//Schedules

router.post(
  "/schedules",
  authTokenMiddleware,
  virifyDateMiddleware,
  createSchedulesController
);

router.get(
  "/schedules/properties/:id",
  authTokenMiddleware,
  isAdmMiddlewere,
  getScheduleController
);
