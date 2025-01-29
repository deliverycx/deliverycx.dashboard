import dayjs from 'dayjs';
import { useMemo } from 'react';



export const useCaseCarts = (chart: { dates: string[], values: number[] }) => {

	console.log("chart", chart);
	const splitMouth = chart.dates.map((val) => Number(val.split("-")[1]))


	const fullMounth = (arr: any) => {

		// Массив для результата
		let result = [...arr];

		// Добавляем недостающие числа
		for (let i = 1; i <= 12; i++) {
			if (!result.includes(i)) {
				result.push(i);
			}
		}
		return result.sort((a, b) => a - b);
	}


	const valueDateFormat = (value: any) => {
		const numbers = Math.floor(value)

		const currentYear = new Date().getFullYear()
		const date = new Date(currentYear, Math.floor(numbers) - 1);
		return date.toLocaleDateString('default', { month: 'short' })
	}

	const fullValueInMounth = (arr: any) => {
		const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
		const currentMonths = arr;
		const values = chart.values;

		// Создаем объект для быстрых сопоставлений значений по ключам
		const monthValuesMap: any = {};
		currentMonths.forEach((month: any, index: any) => {
			monthValuesMap[month] = values[index];
		});

		// Формируем новый массив
		const result = months.map(month => monthValuesMap[month] ?? null);
		return result
	}

	const currentMounth = useMemo(() => {
		const currentDay = Number(dayjs().format('MM'))
		const full = fullValueInMounth(splitMouth)
		const months = [
			"Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
			"Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
		];
		return {
			date: months[currentDay - 1],
			value: full[currentDay - 1]
		}
	}, [splitMouth])

	return {
		fullValueInMounth,
		valueDateFormat,
		fullMounth,
		splitMouth,
		currentMounth
	}
}