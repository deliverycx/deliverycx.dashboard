import { IfinModelMouth } from "entities/deportamentsFinModel/types/finModel.type";
import { IgroopsDep } from "features/deportamensListChoise/types/groopsdeportemets.type";

export class FinModelIndicatorFormatter {
	rageFinModel: any

	constructor(
		dataFinModel: IfinModelMouth[],
		rageMouth: { mounthDateCurrent: string, mounthDatePrevious: string },
	) {
		const findRageFinModel = this.findMounthModels(dataFinModel, rageMouth)
		if (findRageFinModel) {
			const [modelCurrent, modelPrevious] = findRageFinModel

			this.rageFinModel = { modelCurrent, modelPrevious }
		}

	}

	findMounthModels(dataFinModel: IfinModelMouth[], mounth: { mounthDateCurrent: string, mounthDatePrevious: string }) {
		const findModelCurrent = dataFinModel.find((val) => val.mouth === mounth.mounthDateCurrent)
		const findModelPrevious = dataFinModel.find((val) => val.mouth === mounth.mounthDatePrevious)

		return findModelCurrent && findModelPrevious ? [findModelCurrent, findModelPrevious] : null
	}

	//цвета
	performanceIndicator(key: string) {
		if (this.rageFinModel) {
			return this.rageFinModel.modelCurrent.model[key].fact > this.rageFinModel.modelPrevious.model[key].fact ? "red" : "green"
		}
	}
	//стрелки
	trendIndicator(key: string) {

		if (this.rageFinModel) {
			//console.log('modelCurrent', key, this.rageFinModel.modelCurrent.model);
			//console.log('modelPrevious', key, this.rageFinModel.modelPrevious.model);
			return this.rageFinModel.modelCurrent.model[key].fact > this.rageFinModel.modelPrevious.model[key].fact ? "up" : "down"
		}
	}
}