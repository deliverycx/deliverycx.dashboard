import { FC, useEffect, useState } from "react";
import { SettingDatePicker } from "./SettingDatePicker";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ruRU } from '@mui/x-date-pickers/locales';
import ru from 'dayjs/locale/ru';
import dayjs from 'dayjs';
import "./style.scss"


export const RageDateFinModel: FC<{ set: any }> = ({ set }) => {
	const [mounthDateCurrent, setMounthDateCurrent] = useState<any>(dayjs().year(2024))


	useEffect(() => {
		set({
			mounthDateCurrent: mounthDateCurrent.format('YYYY-MM'),
			mounthDatePrevious: dayjs(mounthDateCurrent).subtract(1, 'month').format('YYYY-MM')
		})
	}, [mounthDateCurrent])



	return (
		<div className="rage_date_section">
			<h3>Выберите период</h3>
			<div className="rage_box">

				<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ru as unknown}
					localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}>
					<DatePicker
						views={['month']}

						label="Выберите дату"

						defaultValue={mounthDateCurrent}
						onChange={setMounthDateCurrent}
					/>
				</LocalizationProvider>

			</div>

		</div>
	)
}