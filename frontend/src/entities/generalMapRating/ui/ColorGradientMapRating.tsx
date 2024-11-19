import { WidgetsColum } from "@shared/ui/widgets/WidgetsColumColor"
import "./ColorMapRating.style.scss"
import React, { FC } from "react"
import { useCaseGradientMapRating } from "../hooks/useCaseGradientMapRating"
import { ColorGradientMapRatingColum } from "./ColorGradientMapRatingColum"
import { colorName } from "../types/colorRating.type"

type IProps = {
	currenMapRating: any
	prevMapRating: any
	keyMap: string
}

export const ColorGradientContext = React.createContext<{ keyMap: string }>({
	keyMap: ""
})
export const ColorGradientMapRating: FC<IProps> = ({ currenMapRating, prevMapRating, keyMap }) => {
	const gradientDeportamets = useCaseGradientMapRating({ currenMapRating, prevMapRating })

	const columArrowStatus = (numb: number) => {
		const n = Math.sign(numb)
		return n === -1 ? "down" : "up"
	}


	return (

		<div className="color_rating">
			<ColorGradientContext.Provider value={{ keyMap }}>
				<ColorGradientMapRatingColum mapRating={gradientDeportamets.green} colorMap={colorName.green}>
					<WidgetsColum
						styleSettings={{
							bgcolor: "#9bcfb5",
							colorNum: "#006232"
						}}
						childernSettings={{
							cloumNumber: gradientDeportamets.green.numberColorDeportaments,
							columStatusNumber: gradientDeportamets.green.diffNumber,
							columStatus: columArrowStatus(gradientDeportamets.green.diffNumber),
						}}
					/>
				</ColorGradientMapRatingColum>

				<ColorGradientMapRatingColum mapRating={gradientDeportamets.witegreen} colorMap={colorName.witegreen}>
					<WidgetsColum
						styleSettings={{
							bgcolor: "#cee1af",
							colorNum: "#4d7819"
						}}
						childernSettings={{
							cloumNumber: gradientDeportamets.witegreen.numberColorDeportaments,
							columStatusNumber: gradientDeportamets.witegreen.diffNumber,
							columStatus: columArrowStatus(gradientDeportamets.witegreen.diffNumber),
						}}
					/>
				</ColorGradientMapRatingColum>

				<ColorGradientMapRatingColum mapRating={gradientDeportamets.yelow} colorMap={colorName.yelow}>
					<WidgetsColum
						styleSettings={{
							bgcolor: "#fff7b2",
							colorNum: "#a89b00"
						}}
						childernSettings={{
							cloumNumber: gradientDeportamets.yelow.numberColorDeportaments,
							columStatusNumber: gradientDeportamets.yelow.diffNumber,
							columStatus: columArrowStatus(gradientDeportamets.yelow.diffNumber),
						}}
					/>
				</ColorGradientMapRatingColum>

				<ColorGradientMapRatingColum mapRating={gradientDeportamets.red} colorMap={colorName.red}>
					<WidgetsColum
						styleSettings={{
							bgcolor: "#f3a79f",
							colorNum: " #940d14"
						}}
						childernSettings={{
							cloumNumber: gradientDeportamets.red.numberColorDeportaments,
							columStatusNumber: gradientDeportamets.red.diffNumber,
							columStatus: columArrowStatus(gradientDeportamets.red.diffNumber),
						}}
					/>
				</ColorGradientMapRatingColum>
			</ColorGradientContext.Provider>
		</div>
	)
}