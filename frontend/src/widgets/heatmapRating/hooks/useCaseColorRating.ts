import { useEffect, useMemo } from "react";
import { useRequestGeneralRatingFinModel } from "./requestGeneralRatingFinModel";
import { colorName } from "entities/generalMapRating";
import * as ss from "simple-statistics";

//хард код!!!
const Excommunicado = [
	"24cd87c0-91b1-41f0-91c6-b9758deae4ae",
	"e7e2349c-2502-4206-8bf2-07455e371f73",
	"646df319-3183-43f2-8d5a-02e37e915f19",
	"501b47ce-0abe-4ba0-9e79-0011aecb7b60",
	"98021fee-f3e9-4ce8-acda-da5cbd136c50"
]


export const sortedDiffMapColor = (map: any, key: string, keysort: "asc" | "desc") => {
	const colorPriority: any = {
		[colorName.green]: 0,
		[colorName.witegreen]: 1,
		[colorName.yelow]: 2,
		[colorName.red]: 3,
	};

	const sortedResult = map.sort((a: any, b: any) => {
		const aColorPriority = colorPriority[a.color] ?? 4; // если цвет не распознан — в конец
		const bColorPriority = colorPriority[b.color] ?? 4;

		if (keysort === "asc") {
			if (aColorPriority !== bColorPriority) {
				return aColorPriority - bColorPriority; // сначала зелёные
			}

			return b[key] - a[key];
		}
		if (keysort === "desc") {
			if (aColorPriority !== bColorPriority) {
				return bColorPriority - aColorPriority; // сначала зелёные
			}

			return a[key] - b[key];
		}


	});


	return sortedResult;

};

export const useCaseColorRating = (mapRating: any) => {
	const generalRatingGradation = (data: any, key: string) => {
		const profitDiffValues = data.map((item: any) => {
			if (!item[key]) {
				return 0;
			} else {
				return item[key];
			}
		});
		const minProfitDiff = Math.min(...profitDiffValues);
		const maxProfitDiff = Math.max(...profitDiffValues);

		function normalize(value: number): number {
			return (value - minProfitDiff) / (maxProfitDiff - minProfitDiff);
		}


		// Разделить диапазон на четыре части
		/**/
		const range = maxProfitDiff - minProfitDiff;
		const redLimit = minProfitDiff + range * 0.25;
		const yellowLimit = minProfitDiff + range * 0.5;
		const lightGreenLimit = minProfitDiff + range * 0.75;

		//console.log("profitDiffValues", profitDiffValues);
		/*
				const redLimit = 0.25; // Нормализованное значение для 25%
				const yellowLimit = 0.5; // Нормализованное значение для 50%
				const lightGreenLimit = 0.75;
		
				
				const datas = profitDiffValues;
				const redLimit = ss.quantile(datas, 0.25);
				const yellowLimit = ss.quantile(datas, 0.5);
				const lightGreenLimit = ss.quantile(datas, 0.75);
				const green = ss.quantile(datas, 1);
				*/


		//Функция для определения цвета
		function getColor(profitDiff: any) {

			if (profitDiff <= redLimit) return colorName.red;
			if (profitDiff <= yellowLimit) return colorName.yelow;
			if (profitDiff <= lightGreenLimit) return colorName.witegreen;
			return colorName.green;
			/*
		if (profitDiff <= redLimit) return colorName.red;
		if (profitDiff > redLimit && profitDiff <= yellowLimit) return colorName.yelow;
		if (profitDiff > yellowLimit && profitDiff <= lightGreenLimit) return colorName.witegreen;
		if (profitDiff >= lightGreenLimit) return colorName.green;
		*/
		}



		const fixedColor = (item: any) => {

			const getColorByProfitDifferencePlan = (value: number): string => {

				if (value > 20) return colorName.green;
				if (value <= 20 && value >= 10) return colorName.witegreen;
				if (value < 10 && value >= -40) return colorName.yelow;
				return colorName.red;
			}

			if (key === "profitDifferenceOpening") {
				if (item.profitDifferenceOpening < 700) {
					return colorName.green
				} else {
					return getColor(item[key])
				}
			}
			if (key === "profitDifferencePlan") {
				return getColorByProfitDifferencePlan(item.profitDifferencePlan)
			}



		}



		//Применить функцию ко всем объектам
		const result = data.map((item: any) => {
			let color
			if (Excommunicado.includes(item.departamentid)) {
				color = fixedColor(item)
			} else {
				color = getColor(item[key]);
			}


			return {
				...item,
				color,
			};
		});

		return result;
	};


	const sortedMap = (result: any, key: any) => {
		return sortedDiffMapColor(result, key, "asc")
	}



	const handlerChoiseRating = useMemo(
		() => (map: any[], key: string) => {
			const result = generalRatingGradation(map, key);
			return sortedMap(result, key);
		},
		[mapRating]
	);

	return {
		handlerChoiseRating,
	};
};


