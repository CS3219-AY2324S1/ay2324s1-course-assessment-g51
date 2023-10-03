import { AppDataSource } from "./data-source";
import app from "./app";

AppDataSource.initialize()
	.then(async () => {
		console.log("Data source has been initialized");
	})
	.catch((error) => console.log(error));

app.listen(3100, () => {
	console.log(`Server is running on port 3100`);
});
