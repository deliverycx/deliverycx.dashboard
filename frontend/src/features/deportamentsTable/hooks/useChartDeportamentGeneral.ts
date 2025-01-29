import { axiosInstance } from "@shared/api/AxiosCreate"
import { useEffect, useState } from "react"
import dayjs from 'dayjs';

const months = [
	dayjs().year(2024).month(0).format('YYYY-MM'),
	dayjs().year(2024).month(1).format('YYYY-MM'),
	dayjs().year(2024).month(2).format('YYYY-MM'),
	dayjs().year(2024).month(3).format('YYYY-MM'),
	dayjs().year(2024).month(4).format('YYYY-MM'),
	dayjs().year(2024).month(5).format('YYYY-MM'),
	dayjs().year(2024).month(6).format('YYYY-MM'),
	dayjs().year(2024).month(7).format('YYYY-MM'),
	dayjs().year(2024).month(8).format('YYYY-MM'),
	dayjs().year(2024).month(9).format('YYYY-MM'),
	dayjs().year(2024).month(10).format('YYYY-MM'),
	dayjs().year(2024).month(11).format('YYYY-MM'),
];

export const useChartDeportamentGeneral = () => {
	const [generalDeportament, setGeneralDeportament] = useState<any>(null)


	const getDeportamentGeneralAllMounth = async (deportament: string, model: string) => {
		try {
			const { data } = await axiosInstance.post(`/finmodel/generalRatinginDeportament`, {
				deportament: deportament,
				mounth: months
			})
			data && chartFromatModel(data, model)
		} catch (error) {
			console.log(error);
		}
	}

	const chartFromatModel = (data: any, model: string) => {
		const date: any[] = []
		const values: any[] = []
		data.map((value: any) => {
			date.push(value.mouth)
			values.push(value[model])
		})
		setGeneralDeportament({
			dates: date,
			values: values
		})
	}



	return {
		generalDeportament,
		getDeportamentGeneralAllMounth
	}
}