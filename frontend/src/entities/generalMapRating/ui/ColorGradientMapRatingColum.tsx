import { FC, ReactNode, useState } from "react"
import { ColorMapDialog } from "./ColorMapDialog"

type IProps = {
	children: ReactNode
	mapRating: any
	colorMap: string
}
export const ColorGradientMapRatingColum: FC<IProps> = ({ children, mapRating }) => {
	const state = useState(false)
	const [open, setOpen] = state


	return (
		<>
			<div className="wrap_colum" onClick={() => setOpen(true)}>
				{
					children
				}
			</div>
			<ColorMapDialog state={state} maps={mapRating} />

		</>
	)
}