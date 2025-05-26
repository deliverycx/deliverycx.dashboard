
interface DataItem {
	m: string; // месяц
	v: string; // значение (будем преобразовывать в число)
}

interface MonthData {
	sum: number;
	count: number;
}

interface AverageResult {
	m: string; // месяц
	average: number; // среднее значение
}
export class ChartsMultipliServies {
	arrChartMult: any[]
	constructor(arr: any[]) {
		this.arrChartMult = arr
	}

	findAllMoung(key: string) {

		const res = this.arrChartMult.map((val: any) => {
			return val.filteredParams.map((param: any) => {
				return {
					m: param.mouth,
					v: param.model[key].factrub

				}
			})

		})

		return this.mult(res)
	}
	mult(data: any) {
		const flattenedData: DataItem[] = data.flat();

		// Группируем по месяцу и находим среднее значение для каждого месяца
		const result = flattenedData.reduce<{ [key: string]: MonthData }>((acc, { m, v }) => {
			const value = parseFloat(v); // Преобразуем строковое значение в число

			// Если месяц уже существует в аккумуляторе, обновляем данные
			if (acc[m]) {
				acc[m].sum += value;
				acc[m].count += 1;
			} else {
				// Если месяц еще не встречался, инициализируем объект
				acc[m] = { sum: value, count: 1 };
			}
			return acc;
		}, {});


		// Рассчитываем среднее значение для каждого месяца
		const averages = Object.keys(result).map(m => ({
			d: m,
			v: Math.round(result[m].sum / result[m].count)
		}));

		const sortedAverages = averages.sort((a, b) => {
			const dateA = new Date(a.d + '-01'); // Преобразуем строку в дату, добавляя день
			const dateB = new Date(b.d + '-01');
			return dateA.getTime() - dateB.getTime(); // Сравниваем по времени
		});

		return sortedAverages.reduce((acc: any, value: any) => {
			acc.dates.push(value.d)
			acc.values.push(value.v)
			return acc
		}, {
			dates: [],
			values: []
		})
	}

	chartMulptModel() {
		return {
			averageCheck: this.findAllMoung("averageCheck"),
			monthlyCheckCount: this.findAllMoung("monthlyCheckCount"),
			dailyCheckCount: this.findAllMoung("dailyCheckCount"),
			averageDailyRevenue: this.findAllMoung("averageDailyRevenue")
		}
	}
}