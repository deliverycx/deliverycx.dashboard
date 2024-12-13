import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ruRU } from '@mui/x-date-pickers/locales';
import ru from 'dayjs/locale/ru';
import { FC, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import "./style.scss"
import { DateMouth } from 'features/heatMapRatingDates';
import { Stack, Button } from '@mui/material';

export const QuartalDatePicker: FC<{ setDate: any }> = ({ setDate }) => {
	const [selectedDate, setSelectedDate] = useState<any>(dayjs());
	const [datesList, setDatesList] = useState<any>([]);

	const handlerAddDates = (date: any) => {
		const d = date.format('YYYY-MM')
		if (selectedDate && !datesList.includes(d)) {
			setDatesList([...datesList, d]);
		}
	}

	useEffect(() => {
		if (datesList.length !== 0) {
			setDate(datesList)
		}
	}, [datesList])

	return (
		<>
			<Stack spacing={2} direction="row">
				<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ru as unknown}
					localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}>
					<DatePicker
						views={['month']}

						label="Выберите месяц"

						defaultValue={selectedDate}
						onChange={setSelectedDate}
					/>
				</LocalizationProvider>
				<Button variant="text" size="large" onClick={() => handlerAddDates(selectedDate)}>Добавить</Button>
			</Stack>
			<h3 className="title_date">Список выбранных дат:</h3>
			{
				datesList.length !== 0 ?
					<DateMouth mounthList={datesList} set={setDatesList} />
					: <span>добавте месяц!</span>
			}

		</>
	)
}