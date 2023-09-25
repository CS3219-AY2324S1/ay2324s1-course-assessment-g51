import { AppDataSource } from "./data-source";
import app from "./app";

AppDataSource.initialize()
	.then(async () => {
		console.log("Data source has been initialized");
		// const user = new User();
		// user.firstName = "Timber";
		// user.lastName = "Saw";
		// user.age = 25;
		// await AppDataSource.manager.save(user);
		// console.log("Saved a new user with id: " + user.user_id);

		// console.log("Loading users from the database...");
		// const users = await AppDataSource.manager.find(User);
		// console.log("Loaded users: ", users);

		// console.log(
		// 	"Here you can setup and run express / fastify / any other framework."
		// );
	})
	.catch((error) => console.log(error));

app.listen(3100, () => {
	console.log(`Server is running on port 3100`);
});
