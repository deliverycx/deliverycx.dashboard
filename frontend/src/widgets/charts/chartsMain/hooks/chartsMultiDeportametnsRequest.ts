import { axiosInstance } from "@shared/api/AxiosCreate"
import { IgroopsDep } from "features/deportamensListChoise/types/groopsdeportemets.type"
import { useState, useEffect } from "react"

export const useChartsMultiDeportametnsRequest = (deportaments: IgroopsDep[]) => {
	const [charsDeportamet, setChartsDeportament] = useState<{ averageCheck: any, averageDailyRevenue: any, dailyCheckCount: any, monthlyCheckCount: any } | null>(null)

	const getChartsDeportamet = async () => {
		try {
			const deportametids = deportaments.map((val) => val.departamentid)
			const { data } = await axiosInstance.post(`charts/chart`, {
				deportamets: deportametids
			})
			if (data) {
				setChartsDeportament(data)
			}
		} catch (error) {

		}
	}


	useEffect(() => {
		getChartsDeportamet()
	}, [deportaments])

	return charsDeportamet
}