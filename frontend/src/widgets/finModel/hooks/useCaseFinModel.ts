import { useEffect, useMemo, useState } from "react"
import { useRequestFinModelDetailed } from "./useRequestFinModelDetailed"
import { IfinModelMouth } from "entities/deportamentsFinModel/types/finModel.type"
import { FinModelIndicatorFormatter } from "../entity/FinModelIndicatorFormatter"
import { IpointList } from "@shared/@types/points.type"

export const useCaseFinModel = (deportament: IpointList) => {
	const [rageMouth, setRageMouth] = useState<{ mounthDateCurrent: string, mounthDatePrevious: string }>()
	const [currentMouthFinModel, setCurrentMouthFinModel] = useState<IfinModelMouth['model'] | null>(null)
	const [currentMouthFinModelMetrics, setCurrentMouthFinModelMetrics] = useState<IfinModelMouth['metric'] | null>(null)

	const dataFinModel = useRequestFinModelDetailed(deportament.departamentid)

	useEffect(() => {
		if (dataFinModel && rageMouth) {
			const finModelMounth = dataFinModel.find((val) => val.mouth === rageMouth.mounthDateCurrent)
			if (finModelMounth) {
				setCurrentMouthFinModel(finModelMounth.model)
				setCurrentMouthFinModelMetrics(finModelMounth.metric)
			}
		}

	}, [rageMouth, deportament, dataFinModel])


	const finModelIndicatorFormatter = useMemo(() => {
		return dataFinModel && rageMouth ? new FinModelIndicatorFormatter(dataFinModel, rageMouth, deportament.finmodel) : null
	}, [dataFinModel, rageMouth])



	return {
		setRageMouth,
		rageMouth,
		dataFinModel,
		currentMouthFinModel,
		currentMouthFinModelMetrics,
		finModelIndicatorFormatter
	}
}