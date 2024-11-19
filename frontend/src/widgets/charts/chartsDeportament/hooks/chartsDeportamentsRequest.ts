import { axiosInstance } from "@shared/api/AxiosCreate"
import { useEffect, useState } from "react"

export const useChartsDeportamentsRequest = (deportamentid: string | string[]) => {
	const [charsDeportamet, setChartsDeportament] = useState<{ averageCheck: any, averageDailyRevenue: any, dailyCheckCount: any, monthlyCheckCount: any } | null>(null)

	const getChartsDeportamet = async () => {
		try {
			const { data } = await axiosInstance.get(`charts/chart?deportamentid=${deportamentid}`)
			console.log(data);
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
		getChartsDeportamet()
	}, [])

	return charsDeportamet
}