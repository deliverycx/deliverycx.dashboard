import { axiosInstance } from "@shared/api/AxiosCreate"
import dayjs from "dayjs"
import { useEffect, useState } from "react"

export const useRequestGeneralRatingFinModel = () => {
	const [mapRating, setMapRating] = useState<{ currenDeportamets: any, prevDeportamens: any }>()
	const [currentDate, setCurrentDate] = useState<any>()

	const getRating = async () => {
		try {
			const date = {
				currenMouth: dayjs().month(3).format('YYYY-MM'), //dayjs().format('YYYY-MM'),
				prevMouth: dayjs().month(4).format('YYYY-MM')
			}
			const { data } = await axiosInstance.post(`/finmodel/generalRating`, currentDate)
			setMapRating(data)
		} catch (error) {

		}
	}

	useEffect(() => {
		currentDate && getRating()
	}, [currentDate])

	console.log(currentDate);

	const handlerCurrentDate = (value: string) => {

		const date = {
			currenMouth: dayjs(value).subtract(1, 'month').format('YYYY-MM'), //dayjs().format('YYYY-MM'),
			prevMouth: dayjs(value).subtract(2, 'month').format('YYYY-MM')
		}
		setCurrentDate(date)
	}

	return { handlerCurrentDate, mapRating }
}