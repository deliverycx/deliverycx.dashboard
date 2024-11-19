import * as dayjs from 'dayjs'

//получение диапазона месяца
export function getMonthDateRange(year: number, month: number): { start: string, end: string } {
	const now = new Date();

	// Проверяем переданные значения года и месяца
	if (month < 0 || month > 11) {
		throw new Error("Month should be between 0 (January) and 11 (December)");
	}

	// Получаем первую дату указанного месяца   // || now.getFullYear() now.getMonth()
	const start = new Date(year, month, 1);

	// Получаем последнюю дату указанного месяца
	const end = new Date(year, month + 1, 0);

	//dayjs().format('YYYY-MM-DD')

	return {
		start: dayjs(start).format('YYYY-MM-DD'),
		end: dayjs(end).format('YYYY-MM-DD')
	};
}