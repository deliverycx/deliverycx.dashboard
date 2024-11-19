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


export const RageDateFinModel: FC<{ rage: boolean, set: any }> = ({ rage, set }) => {
	const [mounthDateCurrent, setMounthDateCurrent] = useState<any>(dayjs())
	const [mounthDatePrevious, setMounthDatePrevious] = useState<any>(dayjs().subtract(1, 'month'))


	useEffect(() => {
		set({
			mounthDateCurrent: mounthDateCurrent.format('YYYY-MM'),
			mounthDatePrevious: mounthDatePrevious.format('YYYY-MM')
		})
	}, [mounthDateCurrent, mounthDatePrevious])

	return (
		<div className="rage_date_section">
			<h3>Выберите период</h3>
			{
				rage &&
				<div className="rage_box">

					<div className="rage_box-item">
						<span className="titl">с</span>



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
					<div className="rage_box-item">
						<span className="titl">по</span>



						<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ru as unknown}
							localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}>
							<DatePicker
								views={['month']}

								label="Выберите дату"

								defaultValue={mounthDatePrevious}
								onChange={setMounthDatePrevious}
							/>
						</LocalizationProvider>

					</div>
				</div>
			}

		</div>
	)
}