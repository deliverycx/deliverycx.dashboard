import { axiosInstance } from "@shared/api/AxiosCreate"
import dayjs from "dayjs"
import { useEffect, useState } from "react"

export const useRequestGeneralRatingFinModel = () => {
	const [rating, setRating] = useState<{ currenDeportamets: any, prevDeportamens: any }>()

	const getRating = async () => {
		try {
			const date = {
				currenMouth: dayjs().subtract(1, 'month').format('YYYY-MM'), //dayjs().format('YYYY-MM'),
				prevMouth: dayjs().subtract(2, 'month').format('YYYY-MM')
			}
			const { data } = await axiosInstance.post(`/finmodel/generalRating`, date)
			setRating(data)
		} catch (error) {

		}
	}
	useEffect(() => {
		getRating()
	}, [])

	return rating
}