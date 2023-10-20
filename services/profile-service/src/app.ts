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

// const corsOptions = {
// 	origin: (origin, callback) => {
// 		callback(null, true);
// 	},
// };

// app.use(cors(corsOptions));

var allowedOrigins = [
	"http://localhost:3000",
	"https://app.peerprepgroup51sem1y2023.xyz",
];
app.use(
	cors({
		origin: function (origin, callback) {
			// allow requests with no origin
			// (like mobile apps or curl requests)
			if (!origin) return callback(null, true);
			if (allowedOrigins.indexOf(origin) === -1) {
				var msg =
					"The CORS policy for this site does not " +
					"allow access from the specified Origin.";
				return callback(new Error(msg), false);
			}
			return callback(null, true);
		},
	})
);

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
