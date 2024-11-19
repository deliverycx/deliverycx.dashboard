import { useEffect, useState } from "react"
import { DeportamentApiRequest } from "../../../shared/api/deportament.api"
import { IpointList } from "@shared/@types/points.type"

export const useDeportamentDetaildedHooks = (deportamentid: string) => {
	const [deportamentDetailed, setDeportamentDetailed] = useState<IpointList | null>(null)

	const getDeportamenData = async (id: string) => {
		try {
			const { data } = await DeportamentApiRequest.getDeportametData(id)
			data && setDeportamentDetailed(data)
		} catch (error) {
			console.log(error);
		}

	}
	useEffect(() => {
		deportamentid && getDeportamenData(deportamentid)
	}, [deportamentid])

	return deportamentDetailed
}