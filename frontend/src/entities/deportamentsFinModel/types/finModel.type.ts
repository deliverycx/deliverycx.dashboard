import { finModelEntity } from "../entity/finModelDomain";

export type IkeyFinModelEntity = keyof typeof finModelEntity
export type IkeyFnFormulModelEntity = "deviationmodelData" | "factmodelData"

export type IfinModelMouth = {
	mouth: string,
	model: Record<keyof typeof finModelEntity, {
		factrub: number,
		costs: number,
		fact: number,
		deviation: number
	}>
	metric: {
		profitSum: number
		profitSumProcent: string
		rashodSum: number
		virukaSum: string
	}
}

