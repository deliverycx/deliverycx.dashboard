import { useContext, useEffect, useMemo, useState } from "react"
import { DeportametListContext } from "widgets/heatmapRating/ui/HeatmapRating"
import { keyDifferenceRatingParams } from "../types/colorRating.type"
import { ColorGradientContext } from "../ui/ColorGradientMapRating"

export const useCaseColorMapDialog = (maps: any) => {
	const [deportametColorList, setDeportametColorList] = useState()
	const { keyMap } = useContext(ColorGradientContext)
	const { deportaments } = useContext(DeportametListContext)

	const titleDialog = () => {
		switch (keyMap) {
			case keyDifferenceRatingParams.profitDifferenceOpening: return "Количество заведений по прибыли (в руб)"
			case keyDifferenceRatingParams.profitDifferencePlan: return "Количество заведений по прибыли (в %)"
			default: return ""
		}
	}



	useEffect(() => {
		if (maps && maps.map) {
			const depsResult = maps.map.map((value: any) => {
				const findDeps = deportaments.find((deps: any) => deps.departamentid === value.departamentid)
				if (findDeps) {
					return {
						deportamentName: findDeps.departament,
						...value
					}
				} else {
					return value
				}
			})
			setDeportametColorList(depsResult)
		}


	}, [maps])

	return {
		deportametColorList,
		titleDialog
	}
}