import { IpointList } from "@shared/@types/points.type"
import { FC } from "react"
import { usePointListEntity } from "../hooks/pointListEntity.hooks"
import { ROUTE_APP } from "application/router/router.const"
import "./PointListEntity.style.scss"

export const PointListEntity: FC<{ pointsList: IpointList[] }> = ({ pointsList }) => {
	const cityAddres = usePointListEntity(pointsList)

	return (
		<>
			{
				cityAddres && cityAddres.length !== 0 &&
				cityAddres.map((val) => {
					return (
						<div className="address_box">
							<div className="address_box-city">{val.city}</div>
							<div className="address_box__deportamets">
								{
									(val.addresses && val.addresses.length !== 0) &&
									val.addresses.map((addres) => {
										return <a href={`${ROUTE_APP.DEPORTAMENT}${addres.departamentid}`} className="address_box__deportamets-item">{addres.departament}</a>
									})

								}

							</div>
						</div>
					)
				})
			}
		</>
	)
}