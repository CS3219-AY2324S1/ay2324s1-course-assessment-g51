import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	user_id: number;

	@Column({ unique: true })
	username: string;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column()
	age: number;
}
