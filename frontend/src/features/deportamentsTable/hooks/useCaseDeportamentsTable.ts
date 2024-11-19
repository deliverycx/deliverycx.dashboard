import { keyDifferenceRatingParams } from "entities/generalMapRating/types/colorRating.type";
import { ColorGradientContext } from "entities/generalMapRating/ui/ColorGradientMapRating";
import { useContext, useEffect, useState } from "react";
import { DeportametListContext } from "widgets/heatmapRating/ui/HeatmapRating";

export const useCaseDeportamentsTable = (deportametColorList: any) => {
	const [sortedDeportametColorList, setSortedDeportametColorList] = useState<any>()
	const { deportaments } = useContext(DeportametListContext)
	const { keyMap } = useContext(ColorGradientContext)

	const keyDiffRating = keyMap as keyDifferenceRatingParams

	const [orderBy, setOrderBy] = useState<{ sortid: string, sorted: "desc" | "asc" }>({
		sortid: keyDifferenceRatingParams[keyDiffRating],
		sorted: "desc"
	})

	const handlerSorted = (sortValue: "asc" | "desc", keyValue: string) => {
		if (sortValue === "asc") {
			setSortedDeportametColorList((value: any) => {
				return value && value.sort((a: any, b: any) => {
					return a[keyValue] - b[keyValue]
				})
			})
			setOrderBy({
				sortid: keyValue,
				sorted: "asc"
			})
		} else if (sortValue === "desc") {
			setSortedDeportametColorList((value: any) => {
				return value.sort((a: any, b: any) => {
					return b[keyValue] - a[keyValue]
				})
			})
			setOrderBy({
				sortid: keyValue,
				sorted: "desc"
			})
		} else {
			setOrderBy({
				sortid: keyDifferenceRatingParams[keyDiffRating],
				sorted: "desc"
			})
		}
	}

	useEffect(() => {
		sortedDeportametColorList && handlerSorted("desc", keyDifferenceRatingParams[keyDiffRating])
	}, [sortedDeportametColorList])


	useEffect(() => {
		if (deportametColorList) {
			const depsResult = deportametColorList.map((value: any) => {
				const findDeps = deportaments.find((deps: any) => deps.departamentid === value.departamentid)
				if (findDeps) {
					return {
						deportamentName: findDeps.departament,
						deportamentIds: findDeps.departamentid,
						...value
					}
				} else {
					return value
				}
			})
			setSortedDeportametColorList(depsResult)
		}


	}, [deportametColorList])

	return {
		sortedDeportametColorList,
		orderBy,
		keyDiffRating,
		handlerSorted
	}

}