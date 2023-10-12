import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	user_id: number;

	@Column()
	username: string;

	@Column()
	email: string;

	@Column({ nullable: true })
	password: string;

	@Column({ nullable: true })
	firstName: string;

	@Column({ nullable: true })
	lastName: string;

	@Column({ nullable: true })
	age: number;
}
