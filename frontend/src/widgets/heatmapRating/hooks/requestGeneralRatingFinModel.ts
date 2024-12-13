import { axiosInstance } from "@shared/api/AxiosCreate"
import dayjs from "dayjs"
import { useEffect, useState } from "react"

export const useRequestGeneralRatingFinModel = () => {
	const [mapRating, setMapRating] = useState<{ currenDeportamets: any, prevDeportamens: any }>()
	const [typeModel, setTypeModel] = useState<string>('')
	const [currenDate, setCurrentDate] = useState<any>()

	const handlerCurrentDate = async () => {
		try {
			if (Array.isArray(currenDate)) {
				const { data } = await axiosInstance.post(`/finmodel/generalRatinginMount?typemodel=${typeModel}`, currenDate)
				setMapRating(data)
			} else {
				const MounthDate = {
					currenMouth: dayjs(currenDate).subtract(0, 'month').format('YYYY-MM'), //dayjs().format('YYYY-MM'),
					prevMouth: dayjs(currenDate).subtract(1, 'month').format('YYYY-MM')
				}
				const { data } = await axiosInstance.post(`/finmodel/generalRating?typemodel=${typeModel}`, MounthDate)
				setMapRating(data)
			}

		} catch (error) {

		}

	}

	return { handlerCurrentDate, mapRating, setTypeModel, setCurrentDate }
}