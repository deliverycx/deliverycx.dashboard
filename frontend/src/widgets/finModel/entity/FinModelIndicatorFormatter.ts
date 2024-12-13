import { finModelEntity } from "entities/deportamentsFinModel/entity/finModelDomain";
import { IfinModelMouth } from "entities/deportamentsFinModel/types/finModel.type";
import { IgroopsDep } from "features/deportamensListChoise/types/groopsdeportemets.type";

export class FinModelIndicatorFormatter {
	rageFinModel: any
	finModelOpen: any

	constructor(
		dataFinModel: any,
		rageMouth: { mounthDateCurrent: string, mounthDatePrevious: string },
		finModelOpen?: any
	) {
		const findRageFinModel = this.findMounthModels(dataFinModel, rageMouth)
		if (findRageFinModel) {
			const [modelCurrent, modelPrevious] = findRageFinModel

			this.rageFinModel = { modelCurrent, modelPrevious }
		}
		if (finModelOpen) {
			this.finModelOpen = finModelOpen
		}
	}

	findMounthModels(dataFinModel: IfinModelMouth[], mounth: { mounthDateCurrent: string, mounthDatePrevious: string }) {
		const findModelCurrent = dataFinModel.find((val) => val.mouth === mounth.mounthDateCurrent)
		const findModelPrevious = dataFinModel.find((val) => val.mouth === mounth.mounthDatePrevious)

		return [findModelCurrent, findModelPrevious]
	}

	//цвета
	performanceIndicator(key: string) {
		if (this.rageFinModel) {
			//console.log(this.rageFinModel.modelCurrent.model[key]);
			if (this.rageFinModel.modelCurrent.model[key].deviation === 0) return
			return this.rageFinModel.modelCurrent.model[key].deviation < 0 ? "green" : "red"
		}
	}
	//стрелки
	trendIndicator(key: keyof typeof finModelEntity) {

		if (this.rageFinModel && this.finModelOpen) {
			if (this.rageFinModel.modelCurrent.model[key].fact === 0) return
			return finModelEntity[key].mark(this.rageFinModel.modelCurrent.model[key].fact)
		}
	}
}