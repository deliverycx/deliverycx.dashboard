import { Injectable } from "@nestjs/common";
import { top5 } from "src/application/const/deportament.conts";
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

	top5fn(res: any) {
		const dep5 = res.filter((val) => top5.includes(val.departamentid))
		return dep5
	}

	async queryGeneryData(date: { currenMouth: string, prevMouth: string }, typemodel: string) {
		const result = await this.finModelRepositories.rageFinModel([date.currenMouth, date.prevMouth])
		const q = this.top5fn(result)
		const filter = this.finModelSerivses.filterGroopByTypeModel(q, typemodel)
		return filter && filter.length !== 0 && this.finModelSerivses.deportamentsGroopsBYDates(filter, date)
	}

	async queryRatingMouth(arrMouth: string[], typemodel: string) {
		const result = await this.finModelRepositories.rageFinModel(arrMouth)
		const q = this.top5fn(result)
		const filter = this.finModelSerivses.filterGroopByTypeModel(q, typemodel)
		return filter && filter.length !== 0 && this.finModelSerivses.deportamentsGroopsSrednieValue(filter)
	}

	async queryDeportamentRatingAllMounths(deportament: string, mouthArr: string[]) {
		const result = await this.finModelRepositories.rageModelBuDeportament(deportament, mouthArr)
		console.log(result);
		return result

	}
}