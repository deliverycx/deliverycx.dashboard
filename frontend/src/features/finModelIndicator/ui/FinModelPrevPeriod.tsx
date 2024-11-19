import { FC, ReactNode, useContext, useState } from "react"
import "./style.scss"
import { FinModelContext } from "widgets/finModel/ui/HOC.DetailedfinModel.ui"


type IProps = {
	keyFin: string,
	metod: string
	children: ReactNode
}
export const FinModelPrevPeriod: FC<IProps> = ({ keyFin, metod, children }) => {
	const useCase = useContext(FinModelContext)
	const { finModelIndicatorFormatter } = useCase
	const [notiv, setNotiv] = useState(false);


	const valueModel = finModelIndicatorFormatter.rageFinModel.modelPrevious.model[keyFin][metod] || null

	return (
		<div className="prevperiod_box" onMouseEnter={() => setNotiv(true)} onMouseLeave={() => setNotiv(false)}>
			{
				children
			}
			{
				valueModel && notiv &&
				<div className="prevperiod_notif">
					{
						valueModel
					}
				</div>
			}
		</div>
	)
}