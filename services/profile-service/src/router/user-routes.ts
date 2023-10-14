import express from "express";
import { UserController } from "../controller/user-controller";

const userController = new UserController();

const router = express.Router();

router.get("/:uid", userController.getUser);
router.post("/", userController.createUser);
router.put("/:uid", userController.updateUser);
router.delete("/:uid", userController.deleteUser);

export default router;
