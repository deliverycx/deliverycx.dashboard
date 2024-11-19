import { IpointList } from "@shared/@types/points.type"
import { DeportamentApiRequest } from "@shared/api/deportament.api"
import { useState, useEffect } from "react"
import { PointsApiRequest } from "widgets/pointsList/api/points.api"

export const usePointsListRequest = () => {
	const [defpointList, setDefPointList] = useState<IpointList[] | null>(null)
	const [pointList, setPointList] = useState<IpointList[] | null>(null)
	const [statusUnload, setStatusUnload] = useState<boolean | string>(false)

	const getPointsList = async () => {
		try {
			const { data } = await PointsApiRequest.getDeportamets()
			if (data) {
				setPointList(data)
				setDefPointList(data)
			}
		} catch (error) {
			console.log(error);
		}
	}



	const unloadRequest = async () => {
		try {

			await DeportamentApiRequest.unloadDeportamets()
			setStatusUnload(true)
			getPointsList()
		} catch (error) {
			setStatusUnload('error')
		}
	}

	const serchPoint = (cities: IpointList[], searchValue: string) => {
		if (defpointList) {
			const result = defpointList.filter(city =>
				city.departament.toLowerCase().includes(searchValue.toLowerCase()),
			);
			setPointList(result)
		}

	}

	useEffect(() => {
		getPointsList()
	}, [statusUnload])

	return { pointList, getPointsList, unloadRequest, statusUnload, serchPoint }
}