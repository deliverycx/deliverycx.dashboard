import { IfinModelMouth } from "../types/finModel.type";
import { finModelEntity } from "./finModelDomain";

export class FomulsClassFinModel {
	static finModelData: any

	constructor(data: any) {
		FomulsClassFinModel.finModelData = data
	}



	static facktModel(cats: string, factRub: number) {
		const oldValue = FomulsClassFinModel.finModelData[cats].opening
		const difference = factRub - oldValue;

		const percentage = (difference / factRub) * 100;

		return percentage.toFixed(2)
	}
	static deviationModel(cats: string, deviation: number) {
		const oldValue = FomulsClassFinModel.finModelData[cats].plan
		return oldValue - deviation
	}

	static ikkoFactMode(cats: string, fact: number) {
		const oldValue = FomulsClassFinModel.finModelData[cats].plan
		const difference = fact - oldValue
		return difference
	}


}

export const helperFinModel = {
	currentMounth(mounth: string, mass: { date: string, average: any }[]) {
		return mass.find((val) => val.date === mounth)
	},
	metricModel(value: IfinModelMouth['model']) {
		const viruka = Number(value.averageRevenue.factrub)
		var rashodSum: number = 0
		for (const key in finModelEntity) {
			const category = key as keyof typeof finModelEntity
			if (finModelEntity[category].rashod) {
				const fasctSum = value[category].factrub
				rashodSum += Number(fasctSum)
			}
		}

		const profitSum = viruka - rashodSum
		const profitSumProcent = (profitSum / viruka) * 100

		// 

		return {
			virukaSum: viruka,
			rashodSum,
			profitSum,
			profitSumProcent: profitSumProcent.toFixed(1)
		}
	}
}