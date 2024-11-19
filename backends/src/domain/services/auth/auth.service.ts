import { Injectable, UnauthorizedException } from "@nestjs/common";
import { compare } from 'bcryptjs';
import { UsersRepositories } from "src/infrastructure/persistence/repositories/users/users.repositories";

@Injectable()
export class AuthServise {

	constructor(
		private readonly UsersRepository: UsersRepositories,
	) { }

	async validateUsers(name: string, password: string) {
		console.log(name, password)
		const user = await this.UsersRepository.findUserMetod(name)

		if (!user) {
			throw new UnauthorizedException();
		}
		const isCorrectPassword = await compare(password, user.password);

		if (!isCorrectPassword) {
			throw new UnauthorizedException();
		}
		return user
	}

	async getUser(name: string) {
		return await this.UsersRepository.findUserMetod(name)
	}

}