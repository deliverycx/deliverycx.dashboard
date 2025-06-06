import { memo } from "react"
import "./PointsList.style.scss"

import { PointListEntity, usePointsListRequest } from "entities/pointListEntity"

export const PointsListWidget = () => {
	const { pointList, serchPoint } = usePointsListRequest()

	return (
		<>

			{
				pointList
					?
					<>
						<div className="pointlist_head">
							<h1 className="pointlist_title">Заведения</h1>
							<div className="pointlist_serch">
								<input className="pointlist_serch-text" onChange={e => serchPoint(pointList, e.target.value)} type="text" />
								<button className="pointlist_serch-btn">
									<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M12.4999 10.9999H11.7099L11.4299 10.7299C12.6299 9.32989 13.2499 7.41989 12.9099 5.38989C12.4399 2.60989 10.1199 0.389893 7.31989 0.0498932C3.08989 -0.470107 -0.470107 3.08989 0.0498932 7.31989C0.389893 10.1199 2.60989 12.4399 5.38989 12.9099C7.41989 13.2499 9.32989 12.6299 10.7299 11.4299L10.9999 11.7099V12.4999L15.2499 16.7499C15.6599 17.1599 16.3299 17.1599 16.7399 16.7499C17.1499 16.3399 17.1499 15.6699 16.7399 15.2599L12.4999 10.9999ZM6.49989 10.9999C4.00989 10.9999 1.99989 8.98989 1.99989 6.49989C1.99989 4.00989 4.00989 1.99989 6.49989 1.99989C8.98989 1.99989 10.9999 4.00989 10.9999 6.49989C10.9999 8.98989 8.98989 10.9999 6.49989 10.9999Z" fill="#999999" />
									</svg>
								</button>
							</div>
						</div>
						<PointListEntity pointsList={pointList} />
					</>

					: "загрузка"
			}

		</>
	)
}
