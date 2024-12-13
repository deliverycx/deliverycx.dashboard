import { Injectable } from "@nestjs/common"

@Injectable()
export class FinModelSerivses {
	deportamentsGroopsBYDates(arr: any[], date: { currenMouth: string, prevMouth: string }) {
		const groopArr = arr.reduce((acc: any, value) => {
			if (value.month) {
				if (value.month === date.currenMouth) {
					acc.currenDeportamets.push(value)
					return acc
					//return acc.currenDeportamets.push(value)
				} else if (value.month === date.prevMouth) {
					acc.prevDeportamens.push(value)
					return acc
				} else {
					return acc
				}
			} else {
				return acc
			}

		}, {
			currenDeportamets: [],
			prevDeportamens: []
		})

		if (groopArr) {
			return {
				currenDeportamets: groopArr.currenDeportamets,
				prevDeportamens: groopArr.prevDeportamens
			}
		} else {
			return null
		}

	}

	deportamentsGroopsSrednieValue(arr: any[]) {
		console.log(arr);
		const grouped = arr.reduce<Record<string, { openingSum: number, planSum: number, countOpening: number, countPlan: number }>>((acc, item) => {
			const { departamentid, profitDifferenceOpening, profitDifferencePlan } = item;

			if (!acc[departamentid]) {
				acc[departamentid] = { openingSum: 0, planSum: 0, countOpening: 0, countPlan: 0, ...item };
			}

			if (profitDifferenceOpening !== null) {
				acc[departamentid].openingSum += profitDifferenceOpening;
				acc[departamentid].countOpening++;
			}

			if (profitDifferencePlan !== null) {
				acc[departamentid].planSum += profitDifferencePlan;
				acc[departamentid].countPlan++;
			}

			return acc;
		}, {});

		const openationValue = (sum1: number, sum2: number, fix: number) => {
			const result = sum1 / sum2
			return result.toFixed(fix)
		}

		const resultData = Object.entries(grouped).map(([departamentid, values]) => ({
			...values,
			departamentid,
			profitDifferenceOpening: values.countOpening ? openationValue(values.openingSum, values.countOpening, 0) : 0,
			profitDifferencePlan: values.countPlan ? openationValue(values.planSum, values.countPlan, 1) : 0,

		}));
		return {
			currenDeportamets: resultData,
			prevDeportamens: []
		}
	}

	filterGroopByTypeModel(arr: any, type: string) {
		if (type && arr) {
			return arr.filter((value: any) => {
				return value.typemodel === type

			})
		} else {
			return arr
		}

	}


}

