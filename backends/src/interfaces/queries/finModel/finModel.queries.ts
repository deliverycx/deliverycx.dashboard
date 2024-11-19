import { Injectable } from "@nestjs/common";
import { FinModelRepositories } from "src/infrastructure/persistence/repositories/finModel/finModel.repositories";
import { FinModelSerivses } from "src/infrastructure/services/finModelServises/finModel.servises";

@Injectable()
export class FinModelQueries {
	constructor(
		private readonly finModelRepositories: FinModelRepositories,
		private readonly finModelSerivses: FinModelSerivses
	) { }


	queryFinModelData(deportamentid: string) {
		return this.finModelRepositories.getFinModel(deportamentid)
	}

	async queryGeneryData(date: { currenMouth: string, prevMouth: string }) {
		const result = await this.finModelRepositories.rageFinModel()
		return result && result.length !== 0 && this.finModelSerivses.deportamentsGroopsBYDates(result, date)
	}
}