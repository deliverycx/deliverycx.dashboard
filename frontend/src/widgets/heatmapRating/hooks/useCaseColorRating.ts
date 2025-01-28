import { useEffect, useMemo } from "react";
import { useRequestGeneralRatingFinModel } from "./requestGeneralRatingFinModel"
import { colorName } from "entities/generalMapRating";
import * as ss from 'simple-statistics';

export const useCaseColorRating = (mapRating: any) => {


	const generalRatingGradation = (data: any, key: string) => {

		const profitDiffValues = data.map((item: any) => {
			if (!item[key]) {
				return 0
			} else {
				return item[key]
			}
		});
		const minProfitDiff = Math.min(...profitDiffValues);
		const maxProfitDiff = Math.max(...profitDiffValues);


		// Шаг 2: Разделить диапазон на четыре части
		/*
		const range = maxProfitDiff - minProfitDiff;
		const redLimit = minProfitDiff + range * 0.25;
		const yellowLimit = minProfitDiff + range * 0.5;
		const lightGreenLimit = minProfitDiff + range * 0.75;
		*/
		//console.log("profitDiffValues", profitDiffValues);


		const datas = profitDiffValues;
		const redLimit = ss.quantile(datas, 0.25);
		const yellowLimit = ss.quantile(datas, 0.5);
		const lightGreenLimit = ss.quantile(datas, 0.75);
		const green = ss.quantile(datas, 1);

		console.log("limit", redLimit, yellowLimit, lightGreenLimit, green);
		// Шаг 3: Функция для определения цвета
		function getColor(profitDiff: any) {
			/*
			if (profitDiff <= redLimit) return colorName.red;
			if (profitDiff <= yellowLimit) return colorName.yelow;
			if (profitDiff <= lightGreenLimit) return colorName.witegreen;
			return colorName.green;
			*/
			if (profitDiff <= redLimit) return colorName.red;
			if (profitDiff > redLimit && profitDiff <= yellowLimit) return colorName.yelow;
			if (profitDiff > yellowLimit && profitDiff <= lightGreenLimit) return colorName.witegreen;
			if (profitDiff >= lightGreenLimit) return colorName.green;
		}


		// Шаг 4: Применить функцию ко всем объектам
		const result = data.map((item: any) => {
			const color = getColor(item[key]);

			return {
				...item,
				color
			};
		});

		return result

	}

	const sortedMap = (map: any, key: string) => {
		const sortedResult = map.sort((a: any, b: any) => b[key] - a[key])
		return sortedResult
	}

	const handlerChoiseRating = useMemo(() => (map: any[], key: string) => {
		const result = generalRatingGradation(map, key)
		return sortedMap(result, key)

	}, [mapRating])

	return {
		handlerChoiseRating
	}

}