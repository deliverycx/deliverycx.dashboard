import { axiosInstance } from "@shared/api/AxiosCreate"
import dayjs from "dayjs"
import { IgroopsDep } from "features/deportamensListChoise/types/groopsdeportemets.type"
import { useState, useEffect } from "react"

export const useChartsMultiDeportametnsRequest = (deportaments: IgroopsDep[], year: any) => {
	const [charsDeportamet, setChartsDeportament] = useState<{ averageCheck: any, averageDailyRevenue: any, dailyCheckCount: any, monthlyCheckCount: any } | null>(null)

	const getChartsDeportamet = async () => {
		try {
			const deportametids = deportaments.map((val) => val.departamentid)
			const { data } = await axiosInstance.post(`charts/chart`, {
				deportamets: deportametids,
				year: year.format("YYYY")
			})
			if (data) {
				setChartsDeportament(data)
			}
		} catch (error) {

		}
	}


	useEffect(() => {
		year && getChartsDeportamet()
	}, [deportaments, year])

	return charsDeportamet
}