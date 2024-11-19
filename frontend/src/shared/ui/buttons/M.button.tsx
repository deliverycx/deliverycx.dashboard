import { FC, ReactNode } from "react"
import { ButtomNotif } from "./ButtomNotif"
import "./button.style.scss"

type IProps = {
	children: ReactNode
	status: boolean | string
}
export const MediumButton: FC<IProps> = ({ children, status }) => {
	return (
		<div className="medium_button">
			{
				children
			}

			{
				status &&
				<ButtomNotif status={status} />
			}

		</div>
	)
}