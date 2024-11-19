import { IpointList } from "@shared/@types/points.type";
import { useEffect, useMemo } from "react";

interface CityAddresses {
	city: string;
	addresses: IpointList[];
}
export const usePointListEntity = (pointsList: IpointList[]) => {

	const cityaddress = useMemo(() => {
		const result = pointsList.reduce<Record<string, IpointList[]>>((acc, item) => {
			const [city, address] = item.departament.split(', ');

			if (!acc[city]) {
				acc[city] = [];
			}
			acc[city].push({
				departament: address,
				departamentid: item.departamentid,
				finmodel: item.finmodel,
				info: item.info,
				setting: item.setting
			});

			return acc;
		}, {});

		// Преобразуем объект в массив
		const formattedResult: CityAddresses[] = Object.entries(result).map(([city, addresses]) => ({
			city,
			addresses
		}));
		return formattedResult
	}, [pointsList])

	return cityaddress
}