import { ReturnModelType } from "@typegoose/typegoose";
import { UsersModel } from "../../entities/users.model";
import { InjectModel } from "nestjs-typegoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersRepositories {
	constructor(
		@InjectModel(UsersModel) private readonly userModel: ReturnModelType<typeof UsersModel>,
	) { }

	async findUserMetod(name: string) {
		return await this.userModel.findOne({ name }).exec();
	}
}