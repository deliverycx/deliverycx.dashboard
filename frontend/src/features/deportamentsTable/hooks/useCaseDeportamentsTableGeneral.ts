import { keyDifferenceRatingParams } from "entities/generalMapRating/types/colorRating.type"
import { useContext, useEffect, useMemo, useState } from "react"
import { sortedDiffMapColor } from "widgets/heatmapRating/hooks/useCaseColorRating"
import { DeportametListContext } from "widgets/heatmapRating/ui/HeatmapRating"

export const useCaseDeportamentsTableGeneral = (deportametColorList: any, handlerColorList: any) => {
	const [sortedDeportametColorList, setSortedDeportametColorList] = useState<any>()
	const { deportaments } = useContext(DeportametListContext)
	const [orderBy, setOrderBy] = useState<{ sortid: string, sorted: "desc" | "asc" }>({
		sortid: keyDifferenceRatingParams.profitDifferenceOpening,
		sorted: "desc"
	})

	const handlerSorted = (sortValue: "asc" | "desc", keyValue: string) => {
		setOrderBy({
			sortid: keyValue,
			sorted: sortValue
		})
	}

	const colorMass = useMemo(() => {
		if (sortedDeportametColorList) {
			const mass = handlerColorList(sortedDeportametColorList, orderBy.sortid)
			if (orderBy.sorted === "asc") {
				return sortedDiffMapColor(mass, orderBy.sortid, "asc")
				/*
				return mass.sort((a: any, b: any) => {
					return a[orderBy.sortid] - b[orderBy.sortid]
				})
				*/
			}
			if (orderBy.sorted === "desc") {
				/*
				return mass.sort((a: any, b: any) => {
					return b[orderBy.sortid] - a[orderBy.sortid]
				})
				*/
				return sortedDiffMapColor(mass, orderBy.sortid, "desc")
			}
		}

	}, [sortedDeportametColorList, orderBy])

	useEffect(() => {
		setSortedDeportametColorList(colorMass)
	}, [orderBy])

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
			setSortedDeportametColorList(handlerColorList(depsResult, orderBy.sortid))
		}
	}, [deportametColorList])

	return {
		sortedDeportametColorList,
		orderBy,
		handlerSorted
	}
}