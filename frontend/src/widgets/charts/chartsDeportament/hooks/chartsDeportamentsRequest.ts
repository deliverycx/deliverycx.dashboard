import { axiosInstance } from "@shared/api/AxiosCreate"
import { useEffect, useState } from "react"

export const useChartsDeportamentsRequest = (deportamentid: string | string[], year: any) => {
	const [charsDeportamet, setChartsDeportament] = useState<{ averageCheck: any, averageDailyRevenue: any, dailyCheckCount: any, monthlyCheckCount: any } | null>(null)

	const getChartsDeportamet = async (currentYear: string) => {
		try {
			const { data } = await axiosInstance.get(`charts/chart?deportamentid=${deportamentid}&year=${currentYear}`)
			if (data) {
				setChartsDeportament(data[0])
			}
		} catch (error) {

		}
	}

	const chartsData = (data: any) => {
		return data.reduce((acc: any, value: any) => {
			acc.dates.push(value.date)
			acc.avarage.push(value.values)
			return acc
		}, {
			dates: [],
			values: []
		})
	}



	useEffect(() => {
		year && getChartsDeportamet(year.format('YYYY'))
	}, [year])

	return charsDeportamet
}