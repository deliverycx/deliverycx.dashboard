import { ReturnModelType } from "@typegoose/typegoose";
import { InjectModel } from "nestjs-typegoose";
import { DeportamentsModel } from "../../entities/departaments.model";
import { SredniyChekModel } from "../../entities/sredniychek.model";
import { Injectable } from "@nestjs/common";
import { top5 } from "src/application/const/deportament.conts";

@Injectable()
export class DeportamentsRepositories {
	constructor(
		@InjectModel(DeportamentsModel) private readonly deportamentsModel: ReturnModelType<typeof DeportamentsModel>,
		@InjectModel(SredniyChekModel) private readonly sredniyChekModel: ReturnModelType<typeof SredniyChekModel>
	) { }

	async deportamentsList() {
		const res = await this.deportamentsModel.find({})
		const dep5 = res.filter((val) => top5.includes(val.departamentid))
		return dep5
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