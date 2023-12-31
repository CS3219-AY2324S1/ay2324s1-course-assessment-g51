import bodyParser from "body-parser";
import express, { Express, NextFunction, Request, Response } from "express";
import "reflect-metadata";
import userRoutes from "./router/user-routes";

var cors = require("cors");

const app = express();

// Configure CORS to allow our front-end domain to access the APIs
// Before the end of this project, allows CORS for localhost too
// const corsOptions = {
// 	origin: (origin, callback) => {
// 		const allowedOrigins = [
// 			"https://app.peerprepgroup51sem1y2023.xyz",
// 			"http://localhost:3000",
// 		];
// 		if (!origin) {
// 			callback(null, true);
// 		} else {
// 			callback(new Error("Not allowed by CORS"));
// 		}
// 	},
// };

// app.use(cors(corsOptions));

app.use(
	cors({
		origin: "*", // Allow requests from any origin
	})
);

// Health check endpoint 
app.get('/healthz', (_, res) => { 
	res.status(200).send('Server is healthy'); 
});

//app.use(cors());
app.use(bodyParser.json());

app.use("/users", userRoutes);

app.all("*", (req: Request, res: Response) => {
	return res.status(404).send({
		success: false,
		message: "Invalid route",
	});
});

export default app;
