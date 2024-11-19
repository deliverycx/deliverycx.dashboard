import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ruRU } from '@mui/x-date-pickers/locales';
import ru from 'dayjs/locale/ru';
import { FC, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import "./style.scss"


export const SettingDatePicker: FC<{ setDate: any }> = ({ setDate }) => {
	const [selectedDate, setSelectedDate] = useState<any>(dayjs());


	useEffect(() => {
		setDate(selectedDate.format('YYYY-MM'))
	}, [selectedDate])


	return (
		<>


			<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ru as unknown}
				localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}>
				<DatePicker
					views={['month']}

					label="Выберите месяц"

					defaultValue={selectedDate}
					onChange={setSelectedDate}
				/>
			</LocalizationProvider>

		</>

	)
}