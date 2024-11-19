import { DeportamentApiRequest } from "@shared/api/deportament.api"
import { finModelApiRequest } from "entities/deportamentsFinModel/api/finModel.api"
import { IfinModelMouth } from "entities/deportamentsFinModel/types/finModel.type"
import { useState, useEffect } from "react"

export const useRequestFinModelDetailed = (deportament: string) => {
	const [finModelAll, setFinModelAll] = useState<IfinModelMouth[] | null>(null)

	const getFinModel = async () => {
		try {
			const { data } = await finModelApiRequest.getFinModel(deportament)
			if (data && data.paramsModel && data.paramsModel.lenght !== 0) {
				setFinModelAll(data.paramsModel)
			}
		} catch (error) {
			console.log(error);
		}
	}




	useEffect(() => {
		getFinModel()
	}, [deportament])

	return finModelAll
}