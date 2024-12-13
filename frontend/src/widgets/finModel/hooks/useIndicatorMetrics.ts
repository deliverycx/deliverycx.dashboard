import { IfinModelMouth } from "entities/deportamentsFinModel/types/finModel.type";
import { AnyARecord } from "node:dns";
import { useCallback, useEffect, useMemo } from "react";


type IcaseMetric = "virukaSum" | "rashodSum" | "profitSum" | "profitSumProcent"

export const useIndicatorMetrics = (metrics: IfinModelMouth['metric'], finModel: any) => {

	const helpSum = (a: any, b: AnyARecord) => {
		const sum = Number(a) - Number(b)
		return Number.isInteger(sum) ? sum : sum.toFixed(1)
	}

	const findSum = (currentMetric: any) => {

		return (metricName: string, openModel: any) => {
			if (currentMetric && metricName && openModel) {
				if (metricName === 'rashodSum') {
					return {
						sum: helpSum(currentMetric[metricName], openModel),
						trend: Number(currentMetric[metricName]) >= Number(openModel) ? "down" : "up",
						colrs: Number(currentMetric[metricName]) >= Number(openModel) ? "green" : "red"

					}
				} else {
					return {
						sum: helpSum(currentMetric[metricName], openModel),
						trend: Number(currentMetric[metricName]) >= Number(openModel) ? "up" : "down",
						colrs: Number(currentMetric[metricName]) >= Number(openModel) ? "green" : "red"

					}
				}

			}

		}


	}

	const actualMetric = useCallback((caseMetric: IcaseMetric) => {
		if (metrics && finModel) {
			const fn = findSum(metrics)
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