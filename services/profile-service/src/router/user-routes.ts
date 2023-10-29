import express from "express";
import { UserController } from "../controller/user-controller";

const userController = new UserController();

const router = express.Router();

//CRUD for users
router.get("/profile/:uid", userController.getUser);
router.post("/profile", userController.createUser);
router.put("/profile/:uid", userController.updateUser);
router.delete("/profile/:uid", userController.deleteUser);

//for getting and assigning admin
router.get("/admin", userController.getAdmin);
router.get("/admin/:uid", userController.isAdmin);
router.put("/admin", userController.setAdmin);

//getting all request
router.get("/request", userController.getRequest);
router.put("/request", userController.setRequest);

//check super admin
router.get("/superAdmin/:uid", userController.isSuperAdmin);

export default router;
