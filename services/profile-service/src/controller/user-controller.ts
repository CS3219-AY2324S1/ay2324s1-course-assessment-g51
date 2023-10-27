import { Request, Response } from "express";
import { ResponseUtil } from "../utils/Response";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";

interface iUserData {
	uid: string;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	age: number;
}

const ERR_MSG_NO_USER = "User not found";
const ERR_MSG_BAD_REQUEST =
	"Bad Request - Request body is empty or fields missing";
const ERR_MSG_AGE_NEGATIVE = "Invalid age: Age cannot be negative.";
const ERR_MSG_DUPLICATE =
	"Update a resource that already exists or has conflicting information";
const ERR_MSG_AGE_TOO_LARGE = "Invalid age: too large";
const ERR_MSG_WRONGFORMAT = "Wrong format in json body";

//helper function to validate data
async function validateData(userData: iUserData): Promise<string | null> {
	// Array of required fields
	const requiredFields = [
		"uid",
		"username",
		"email",
		"firstName",
		"lastName",
		"age",
	];

	for (const field of requiredFields) {
		if (!userData[field]) {
			return ERR_MSG_BAD_REQUEST;
		}
	}
	if (userData.age < 0) {
		return ERR_MSG_AGE_NEGATIVE;
	}
	if (userData.age >= 1000) {
		return ERR_MSG_AGE_TOO_LARGE;
	}
	return null;
}

export class UserController {
	async getUser(req: Request, res: Response): Promise<Response> {
		const { uid } = req.params;
		const user = await AppDataSource.getRepository(User).findOneBy({
			uid: uid,
		});
		if (!user) {
			return ResponseUtil.sendError(res, ERR_MSG_NO_USER, 404);
		}
		return ResponseUtil.sendResponse(res, user, 200);
	}

	async createUser(req: Request, res: Response, next): Promise<Response> {
		const userData = req.body;

		const validationError = await validateData(userData);
		if (validationError) {
			return ResponseUtil.sendError(res, validationError, 400);
		}

		const repo = AppDataSource.getRepository(User);
		const userInDB = await AppDataSource.getRepository(User).findOneBy({
			uid: userData.uid,
		});
		if (userInDB) {
			return ResponseUtil.sendError(res, ERR_MSG_DUPLICATE, 409);
		}
		const user = repo.create(userData);
		await repo.save(user);
		return ResponseUtil.sendResponse(res, user, 201);
	}

	async updateUser(req: Request, res: Response): Promise<Response> {
		const { uid } = req.params;
		const userData = req.body;

		const validationError = await validateData(userData);
		if (validationError) {
			return ResponseUtil.sendError(res, validationError, 400);
		}

		if (uid !== userData.uid) {
			return ResponseUtil.sendError(res, ERR_MSG_DUPLICATE, 409);
		}

		const repo = AppDataSource.getRepository(User);
		const user = await repo.findOneBy({
			uid: uid,
		});
		if (!user) {
			return ResponseUtil.sendError(res, ERR_MSG_NO_USER, 404);
		}

		repo.merge(user, userData);
		await repo.save(user);
		return ResponseUtil.sendResponse(res, user, 201);
	}

	async deleteUser(req: Request, res: Response): Promise<Response> {
		const { uid } = req.params;
		const repo = AppDataSource.getRepository(User);
		const user = await repo.findOneBy({
			uid: uid,
		});
		if (!user) {
			return ResponseUtil.sendError(res, ERR_MSG_NO_USER, 404);
		}
		await repo.remove(user);
		return ResponseUtil.sendResponse(res, null, 204);
	}

	// getAdmin return an array of users who are admins
	async getAdmin(req: Request, res: Response): Promise<Response> {
		const allAdmins = await AppDataSource.getRepository(User).findBy({
			isAdmin: true,
		});
		return ResponseUtil.sendResponse(res, allAdmins, 200);
	}

	//isAdmin returns true false in data section
	async isAdmin(req: Request, res: Response): Promise<Response> {
		const { uid } = req.params;
		const user = await AppDataSource.getRepository(User).findOneBy({
			uid: uid,
		});
		if (!user) {
			return ResponseUtil.sendError(res, ERR_MSG_NO_USER, 404);
		}
		return ResponseUtil.sendResponse(res, user.isAdmin, 200);
	}

	// the body must be a json { "toUpdate": [[uid1, true],[uid, false],[],...]}
	// if your format is wrong api wont work as intended eg if u put in a string
	// or number instead of boolean -> it will be false.
	async setAdmin(req: Request, res: Response): Promise<Response> {
		const userData = req.body;
		const repo = AppDataSource.getRepository(User);

		const lstToUpdate = userData.toUpdate;

		if (!lstToUpdate) {
			return ResponseUtil.sendResponse(res, lstToUpdate, 201);
		}

		try {
			for (let i = 0; i < lstToUpdate.length; i++) {
				//try catch incase format given is wrong
				const currentUid = lstToUpdate[i][0];
				const currentSetValue = lstToUpdate[i][1];

				const user = await repo.findOneBy({
					uid: currentUid,
				});

				if (!user) {
					return ResponseUtil.sendError(res, ERR_MSG_NO_USER, 404);
				}

				user.isAdmin = currentSetValue;
				await repo.save(user);
			}
			return ResponseUtil.sendResponse(res, lstToUpdate, 201);
		} catch (error) {
			return ResponseUtil.sendError(res, ERR_MSG_WRONGFORMAT, 400);
		}
	}

	// getAdmin return an array of users who are admins
	async getRequest(req: Request, res: Response): Promise<Response> {
		const allRequests = await AppDataSource.getRepository(User).findBy({
			isRequestingAdmin: true,
		});
		return ResponseUtil.sendResponse(res, allRequests, 200);
	}

	// the body must be a json { "toUpdate": [[uid1, true],[uid, false],[],...]}
	// if your format is wrong api wont work as intended eg if u put in a string
	// or number instead of boolean -> it will be false.
	async setRequest(req: Request, res: Response): Promise<Response> {
		const userData = req.body;
		const repo = AppDataSource.getRepository(User);

		const lstToUpdate = userData.toUpdate;

		if (!lstToUpdate) {
			return ResponseUtil.sendResponse(res, lstToUpdate, 201);
		}

		try {
			for (let i = 0; i < lstToUpdate.length; i++) {
				//try catch incase format given is wrong
				const currentUid = lstToUpdate[i][0];
				const currentSetValue = lstToUpdate[i][1];

				const user = await repo.findOneBy({
					uid: currentUid,
				});

				if (!user) {
					return ResponseUtil.sendError(res, ERR_MSG_NO_USER, 404);
				}

				user.isRequestingAdmin = currentSetValue;
				await repo.save(user);
			}
			return ResponseUtil.sendResponse(res, lstToUpdate, 201);
		} catch (error) {
			return ResponseUtil.sendError(res, ERR_MSG_WRONGFORMAT, 400);
		}
	}
}
