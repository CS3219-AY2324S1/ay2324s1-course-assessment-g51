import { Request, Response } from "express";
import { ResponseUtil } from "../utils/Response";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";

export class UserController {
	async getUser(req: Request, res: Response): Promise<Response> {
		const { username } = req.params;
		const user = await AppDataSource.getRepository(User).findOneBy({
			username: username,
		});
		if (!user) {
			return ResponseUtil.sendError(res, "User not found", 404);
		}
		return ResponseUtil.sendResponse(res, user, 200);
	}

	async createUser(req: Request, res: Response, next): Promise<Response> {
		const userData = req.body;
		const repo = AppDataSource.getRepository(User);

		//check for duplicate username
		const checkUserName = await AppDataSource.getRepository(User).findOneBy(
			{
				username: userData.username,
			}
		);

		if (checkUserName) {
			return ResponseUtil.sendError(res, "Username already used", 404);
		}

		//check for duplicate email
		const checkEmail = await AppDataSource.getRepository(User).findOneBy({
			username: userData.username,
		});

		if (checkEmail) {
			return ResponseUtil.sendError(res, "Email already used", 404);
		}

		const user = repo.create(userData);
		await repo.save(user);
		return ResponseUtil.sendResponse(res, user, 201);
	}

	async updateUser(req: Request, res: Response): Promise<Response> {
		const { username } = req.params;
		const userData = req.body;
		const repo = AppDataSource.getRepository(User);
		const user = await repo.findOneBy({
			username: username,
		});
		if (!user) {
			return ResponseUtil.sendError(res, "user not found", 404);
		}
		repo.merge(user, userData);
		await repo.save(user);
		return ResponseUtil.sendResponse(res, user, 201);
	}

	async deleteUser(req: Request, res: Response): Promise<Response> {
		const { username } = req.params;
		const repo = AppDataSource.getRepository(User);
		const user = await repo.findOneBy({
			username: username,
		});
		if (!user) {
			return ResponseUtil.sendError(res, "user not found", 404);
		}
		await repo.remove(user);
		return ResponseUtil.sendResponse(res, null);
	}
}
