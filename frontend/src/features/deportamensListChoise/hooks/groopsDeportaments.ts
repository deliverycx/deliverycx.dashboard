import { IpointList } from "@shared/@types/points.type"
import { usePointsListRequest } from "entities/pointListEntity"
import { useMemo } from "react"


export const useGooprsDeportaments = (points: IpointList[] | null) => {


	const groopts = useMemo(() => {
		if (points && points.length !== 0) {
			return points.map((point) => {
				const matchesAddress = point.departament.match(
					/(?<city>.*?),\s?(?<street>.*)/i
				);


				if (matchesAddress) {
					const { city, street } = matchesAddress.groups as any;
					return {
						firstLetter: city,
						title: street,
						departamentid: point.departamentid,
						finmodel: point.finmodel,
						info: point.info,
						setting: point.setting
					};
				} else {
					return null
				}


			}).filter(val => val !== null)
		} else {
			return null
		}
	}, [points])

	return groopts
}