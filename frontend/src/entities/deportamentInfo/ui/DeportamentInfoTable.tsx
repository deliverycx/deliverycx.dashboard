import { IpointList } from "@shared/@types/points.type"
import { FC } from "react"
import { useCaseDeportamentInfoFormic } from "../hooks/useCaseDeportamentInfoFromic"
import "./style.scss"


export const DeportamentInfoTable: FC<{ deportament: IpointList }> = ({ deportament }) => {
	const { inputFromName } = useCaseDeportamentInfoFormic(deportament)

	const rowTableInfo = () => {
		return (Object.keys(inputFromName) as Array<keyof typeof inputFromName>).map((key) => {
			return (
				<div className="deportament_info-item ">
					<div className="deportament_info-item_title">{inputFromName[key]}</div>
					<div className="deportament_info-item_value">{deportament.info[key]}</div>
				</div>
			)
		})
	}
	return (
		<>
			{
				deportament.info &&
				<div className="deportament_info">
					{rowTableInfo()}
				</div>
			}

		</>
	)
}