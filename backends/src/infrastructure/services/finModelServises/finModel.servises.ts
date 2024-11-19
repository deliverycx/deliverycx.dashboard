import { Injectable } from "@nestjs/common"

@Injectable()
export class FinModelSerivses {
	deportamentsGroopsBYDates(arr: any[], date: { currenMouth: string, prevMouth: string }) {
		const groopArr = arr.reduce((acc: any, value) => {
			if (value.month === date.currenMouth) {
				acc.currenDeportamets.push(value)
				return acc
				//return acc.currenDeportamets.push(value)
			} else if (value.month === date.prevMouth) {
				acc.prevDeportamens.push(value)
				return acc
			}
		}, {
			currenDeportamets: [],
			prevDeportamens: []
		})
		return {
			currenDeportamets: groopArr.currenDeportamets,
			prevDeportamens: groopArr.prevDeportamens
		}
	}

}

