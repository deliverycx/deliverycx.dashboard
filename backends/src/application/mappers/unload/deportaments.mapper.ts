import { DeportamentsDto, SredniychekDto } from "src/application/dto/unload/deportaments.dto";
import { deportamentsIIkkoBody } from "src/interfaces/types/departaments.type";

export const deportamentMapper = (requestBody: deportamentsIIkkoBody[]): DeportamentsDto[] => {
	return requestBody.map((value) => {
		return {
			departament: value.name,
			departamentid: value.departmentId
		}
	})
}

export const SredniychekMapper = (requestBody: any[]): SredniychekDto[] => {

	const result = requestBody.reduce((acc, item) => {
		const depId = item['Department.Id'];
		const date = item['OpenDate.Typed'];
		const average = item['DishDiscountSumInt.average'];
		const dateMount = date.slice(0, 7); // '2024-03' из '2024-03-31'


		// Если еще нет записи для данного departmentId, добавляем
		if (!acc[depId]) {
			acc[depId] = {
				departamentid: depId,
				sredinychekdate: []
			};
		}

		// Находим или создаем запись для месяца
		const monthEntry = acc[depId].sredinychekdate.find(entry => entry.dateMount === dateMount);

		if (monthEntry) {
			// Если запись месяца уже существует, добавляем данные в dateMass
			monthEntry.dateMass.push({
				date: date,
				average: Math.round(average)
			});
		} else {
			// Если записи месяца нет, создаем ее
			acc[depId].sredinychekdate.push({
				date: dateMount,
				dateMass: [{
					date: date,
					average: Math.round(average)
				}]
			});
		}

		return acc;
	}, {});

	// Преобразуем объект в массив
	const resultArray = Object.values(result);
	const newmap = resultArray.map((value: any) => {
		const res = value.sredinychekdate.map((mass: any) => {
			const count = mass.dateMass.reduce((acc, val) => {
				return acc + val.average
			}, 0)
			return {
				...mass,
				average: Math.round(count)
			}

		})
		//console.log(res);

		return {

			departamentid: value.departamentid,
			sredinychekdate: res[0]
		}
	})


	return newmap as SredniychekDto[]

	/*
	return requestBody.map((value) => {
		return {
			departamentid: value['Department.Id'],
			sredinychekdate: {
				date: value['OpenDate.Typed'],
				average: value['DishDiscountSumInt.average']
			}

		}
	})
	*/
}


export const SredniychekMounthMapper = (requestBody: { date: { start: string, end: string }, mass: any[] }) => {
	const dateMount = requestBody.date.start.slice(0, 7)
	const day = requestBody.date.end.slice(8, 10);

	return requestBody.mass.map((value) => {
		const discountSum = Math.round(value['UniqOrderId.OrdersCount'])

		return {
			departamentid: value['Department.Id'],
			monthlyCheckCount: {
				date: dateMount,
				average: discountSum
			},
			dailyCheckCount: {
				date: dateMount,
				average: discountSum / Number(day)
			}
		}
	})
}

export const VyruchkaMounthMapper = (requestBody: { date: { start: string, end: string }, mass: any[] }) => {
	const dateMount = requestBody.date.start.slice(0, 7)
	const day = requestBody.date.end.slice(8, 10);

	return requestBody.mass.map((value) => {
		const discountSum = Math.round(value['DishDiscountSumInt'])

		return {
			departamentid: value['Department.Id'],
			averageRevenue: {
				date: dateMount,
				average: discountSum
			},
			averageDailyRevenue: {
				date: dateMount,
				average: discountSum / Number(day)
			}
		}
	})
}