import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class User {
	@PrimaryColumn()
	uid: string;

	@Column()
	username: string;

	@Column()
	email: string;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column()
	age: number;
}
