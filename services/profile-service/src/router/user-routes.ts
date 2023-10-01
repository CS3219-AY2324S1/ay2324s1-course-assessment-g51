import express from "express";
import { UserController } from "../controller/user-controller";

const userController = new UserController();

const router = express.Router();

router.get("/:username", userController.getUser);
router.post("/", userController.createUser);
router.put("/:username", userController.updateUser);
router.delete("/:username", userController.deleteUser);

export default router;
