import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
import { User } from "./entity/User";

//load env file
require("dotenv").config();

export const AppDataSource = new DataSource({
	type: "postgres",
	host: process.env.POSTGRES_HOST,
	port: parseInt(process.env.POSTGRES_PORT),
	username: process.env.POSTGRES_USERNAME,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DATABASE,
	synchronize: true,
	logging: false,
	entities: [User],
	migrations: [],
	subscribers: [],
});
