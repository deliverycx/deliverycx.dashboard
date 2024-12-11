import { IgroopsDep } from "features/deportamensListChoise/types/groopsdeportemets.type"
import { DeportamentApiRequest } from "@shared/api/deportament.api"
import { useEffect, useState } from "react"
import { unloadIIKKOApiRequest } from "entities/unloadIIkko/api/unloadIIkko.api"

export const useCaseRequestUnloadParams = (deportament: IgroopsDep) => {
	const [activeDeportamentParamsIIKKO, setActiveDeportament] = useState<IgroopsDep | null>(null)

	const getUnloadParamIIkko = async () => {
		try {
			const { data } = await unloadIIKKOApiRequest.getUnloadParams(deportament.departamentid)

			data && setActiveDeportament(data)
			return data
		} catch (error) {
			console.log(error);
		}
	}




	useEffect(() => {
		deportament && getUnloadParamIIkko()
	}, [deportament])

	return { getUnloadParamIIkko, activeDeportamentParamsIIKKO }
}