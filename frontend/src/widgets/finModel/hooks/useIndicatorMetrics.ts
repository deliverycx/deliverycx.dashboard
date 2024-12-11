import { IfinModelMouth } from "entities/deportamentsFinModel/types/finModel.type";
import { AnyARecord } from "node:dns";
import { useCallback, useEffect, useMemo } from "react";


type IcaseMetric = "virukaSum" | "rashodSum" | "profitSum" | "profitSumProcent"

export const useIndicatorMetrics = (metrics: { rageFinModel: { modelCurrent: IfinModelMouth, modelPrevious: IfinModelMouth } }, finModel: any) => {

	const helpSum = (a: any, b: AnyARecord) => {
		const sum = Number(a) - Number(b)
		return Number.isInteger(sum) ? sum : sum.toFixed(1)
	}

	const findSum = (rage: any): (currentValue: string, prevSum: any) => { currentMetric: any, previosMetric: any } => {
		return (currentValue: string, prevSum: any) => {
			if (rage && currentValue && prevSum) {
				const current = rage.modelCurrent && rage.modelCurrent.metric
				const prev = rage.modelPrevious && rage.modelPrevious.metric
				return current && prev && {
					currentMetric: {
						sum: helpSum(current[currentValue], prevSum),
						trend: Number(current[currentValue]) >= Number(prevSum) ? "up" : "down",
						colrs: Number(current[currentValue]) >= Number(prevSum) ? "green" : "red"

					},
					previosMetric: {
						sum: helpSum(prev[currentValue], prevSum),
						trend: Number(prev[currentValue]) >= Number(prevSum) ? "up" : "down",
						colrs: Number(prev[currentValue]) >= Number(prevSum) ? "green" : "red"
					}
				}
			}

		}


	}

	const actualMetric = useCallback((caseMetric: IcaseMetric) => {
		if (metrics && metrics.rageFinModel && finModel) {
			const fn = findSum(metrics.rageFinModel)
			switch (caseMetric) {
				case 'virukaSum': return finModel.averageRevenue && fn('virukaSum', finModel.averageRevenue.opening)
				case 'rashodSum': return finModel.expenses && fn('rashodSum', finModel.expenses.opening)
				case 'profitSum': return fn('profitSum', finModel.profit.opening)
				case 'profitSumProcent': return fn('profitSumProcent', finModel.profit.plan)

			}
		}

	}, [metrics, finModel])

	return {
		viruka: actualMetric('virukaSum'),
		rashod: actualMetric('rashodSum'),
		profit: actualMetric('profitSum'),
		profitProcent: actualMetric('profitSumProcent')
	}
}