import { useMemo } from "react"
import { colorName } from "../types/colorRating.type"

export const useCaseGradientMapRating = (map: { currenMapRating: any, prevMapRating: any }) => {


	const findMap = (map: any[], color: colorName) => {
		return map.reduce((acc: any[], value) => {
			if (value.color === color) {
				acc.push(value)
			}
			return acc
		}, [])
	}
	const deportametsByColor = (color: colorName) => {
		const findCurrentDeps = findMap(map.currenMapRating, color)
		const findPrevDeps = findMap(map.prevMapRating, color)
		return {
			numberColorDeportaments: findCurrentDeps.length,
			diffNumber: findCurrentDeps.length - findPrevDeps.length,
			map: findCurrentDeps
		}
	}

	return {
		green: deportametsByColor(colorName.green),
		witegreen: deportametsByColor(colorName.witegreen),
		yelow: deportametsByColor(colorName.yelow),
		red: deportametsByColor(colorName.red)
	}


}