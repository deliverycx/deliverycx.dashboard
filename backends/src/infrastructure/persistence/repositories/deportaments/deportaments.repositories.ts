import { ReturnModelType } from "@typegoose/typegoose";
import { InjectModel } from "nestjs-typegoose";
import { DeportamentsModel } from "../../entities/departaments.model";
import { SredniyChekModel } from "../../entities/sredniychek.model";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DeportamentsRepositories {
	constructor(
		@InjectModel(DeportamentsModel) private readonly deportamentsModel: ReturnModelType<typeof DeportamentsModel>,
		@InjectModel(SredniyChekModel) private readonly sredniyChekModel: ReturnModelType<typeof SredniyChekModel>
	) { }

	async deportamentsList() {
		return await this.deportamentsModel.find({})
	}

	async findDeportament(departamentid: string) {
		return await this.deportamentsModel.findOne({ departamentid: departamentid })
	}



	async deportamentInfo(tabs, departamentid, body) {
		console.log(tabs, departamentid, body);
		await this.deportamentsModel.findOneAndUpdate({
			departamentid: departamentid
		}, {
			$set: {
				[tabs]: body
			}
		})
	}

}