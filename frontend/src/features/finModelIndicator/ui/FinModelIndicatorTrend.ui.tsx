import { FC, useContext, useState } from "react"
import { FinModelContext } from "widgets/finModel/ui/HOC.DetailedfinModel.ui"
import "./style.scss"

export const FinModelIndicatorTrend: FC<{ finKey: string }> = ({ finKey }) => {
	const useCase = useContext(FinModelContext)
	const { finModelIndicatorFormatter } = useCase

	const arrowTrend = finModelIndicatorFormatter.trendIndicator(finKey)

	return (
		<>
			<div className="arrowtrend">


				{
					arrowTrend === 'up' &&
					<svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M1.2002 5.00005C1.0502 5.00005 0.929362 4.95005 0.837695 4.85005C0.746029 4.75005 0.700195 4.63338 0.700195 4.50005C0.700195 4.46672 0.750195 4.35005 0.850195 4.15005L4.4752 0.525049C4.55853 0.441716 4.64186 0.383382 4.7252 0.350049C4.80853 0.316715 4.9002 0.300049 5.0002 0.300049C5.1002 0.300049 5.19186 0.316715 5.2752 0.350049C5.35853 0.383382 5.44186 0.441716 5.5252 0.525049L9.1502 4.15005C9.2002 4.20005 9.2377 4.25422 9.2627 4.31255C9.2877 4.37088 9.3002 4.43338 9.3002 4.50005C9.3002 4.63338 9.25436 4.75005 9.1627 4.85005C9.07103 4.95005 8.9502 5.00005 8.8002 5.00005H1.2002Z" fill="#558950" />
					</svg>
				}
				{
					arrowTrend === 'down' &&
					<svg width="9" height="5" viewBox="0 0 9 5" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M3.9752 4.475L0.350195 0.85C0.300195 0.8 0.262695 0.745833 0.237695 0.6875C0.212695 0.629167 0.200195 0.566667 0.200195 0.5C0.200195 0.366667 0.246029 0.25 0.337695 0.15C0.429362 0.05 0.550195 0 0.700195 0H8.3002C8.4502 0 8.57103 0.05 8.6627 0.15C8.75436 0.25 8.8002 0.366667 8.8002 0.5C8.8002 0.533333 8.7502 0.65 8.6502 0.85L5.0252 4.475C4.94186 4.55833 4.85853 4.61667 4.7752 4.65C4.69186 4.68333 4.6002 4.7 4.5002 4.7C4.4002 4.7 4.30853 4.68333 4.2252 4.65C4.14186 4.61667 4.05853 4.55833 3.9752 4.475Z" fill="#9B540A" />
					</svg>
				}
			</div>

		</>
	)
}