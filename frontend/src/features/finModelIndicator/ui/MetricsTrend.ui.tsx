import { FC, useState } from "react"
import "./style.scss"
import { ArrowTreds } from "@shared/ui/indicators/ArrowTreds"
import "./style.scss"

type IProps = {
	current: {
		trend: "up" | "down"
		sum: number
		colrs: "green" | "red"
	} | null
	previos?: {
		trend: "up" | "down"
		sum: number
		colrs: "green" | "red"
	} | null

}

export const MetricsTrend: FC<IProps> = ({ current, previos }) => {
	const [notiv, setNotiv] = useState(false);


	return (
		<>
			{
				current &&
				<div className={`prevperiod_box arrowtrend ${current.colrs}`} onMouseEnter={() => setNotiv(true)} onMouseLeave={() => setNotiv(false)}>

					<span className="sum">{current.sum}</span>
					{
						previos && notiv &&
						<div className="prevperiod_notif">
							<span>
								{
									previos.sum
								}
							</span>
							<span>
								<ArrowTreds trend={previos.trend} />
							</span>
						</div>
					}
					<ArrowTreds trend={current.trend} />
				</div>
			}
		</>

	)
}