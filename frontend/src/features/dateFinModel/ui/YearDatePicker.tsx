import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ruRU } from '@mui/x-date-pickers/locales';
import ru from 'dayjs/locale/ru';
import { FC, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import "./style.scss"

export const YearDatePicker: FC<{ setDate: any }> = ({ setDate }) => {
	const [selectedYear, setSelectedYear] = useState<any>(dayjs());

	const months = [
		selectedYear.month(0).format('YYYY-MM'),
		selectedYear.month(1).format('YYYY-MM'),
		selectedYear.month(2).format('YYYY-MM'),
		selectedYear.month(3).format('YYYY-MM'),
		selectedYear.month(4).format('YYYY-MM'),
		selectedYear.month(5).format('YYYY-MM'),
		selectedYear.month(6).format('YYYY-MM'),
		selectedYear.month(7).format('YYYY-MM'),
		selectedYear.month(8).format('YYYY-MM'),
		selectedYear.month(9).format('YYYY-MM'),
		selectedYear.month(10).format('YYYY-MM'),
		selectedYear.month(11).format('YYYY-MM'),
	];

	useEffect(() => {
		setDate(months)
	}, [selectedYear])

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ru as unknown}
			localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}>
			<DatePicker
				views={['year']}

				label="Выберите год"

				defaultValue={selectedYear}
				onChange={setSelectedYear}
			/>
		</LocalizationProvider>
	)
}