import { getMonthDateRange } from "src/application/helpers/FormateDate"

export class UnloadServises {


	async dataMouthFromIIKKO(request: any, date: { year: number, mouth: number }) {
		const { start, end } = getMonthDateRange(date.year, date.mouth)
		const result = await request(start, end)
		return {
			date: { start, end },
			mass: result
		}
	}

	dateSplitMounth(date: string) {
		const [year, mounh] = date.split("-")
		return [Number(year), Number(mounh) - 1]
	}
}