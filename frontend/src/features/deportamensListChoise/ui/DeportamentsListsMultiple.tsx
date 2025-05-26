import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled, lighten, darken } from '@mui/system';
import { useGooprsDeportaments } from '../hooks/groopsDeportaments';
import { IgroopsDep } from '../types/groopsdeportemets.type';
import "./style.scss"
import { MediumButton } from '@shared/ui/buttons';
import { usePointsListRequest } from 'entities/pointListEntity';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ruRU } from '@mui/x-date-pickers/locales';
import ru from 'dayjs/locale/ru';
import dayjs from 'dayjs';


const GroupHeader = styled('div')(({ theme }) => ({
	position: 'sticky',
	top: '-8px',
	padding: '4px 10px',
	color: "#333",
	backgroundColor: lighten("#966", 0.85),
	...theme.applyStyles('dark', {
		backgroundColor: darken("#8545", 0.8),
	}),
}));

const GroupItems = styled('ul')({
	padding: 0,
});

type IProps = {
	setter: React.Dispatch<React.SetStateAction<any | null>>
	setSelectedYear: any
}


export const DeportamentsListsMultiple: React.FC<IProps> = ({ setter, setSelectedYear }) => {
	const { pointList, getPointsList, unloadRequest, statusUnload } = usePointsListRequest()
	const optionsDeportamens = useGooprsDeportaments(pointList)



	const handleCityChange = (event: React.SyntheticEvent, value: any) => {
		value && setter(value)
	}


	return (
		<>
			<div className="deportamen_choise">
				<div className="deportamen_choise_list">
					{
						optionsDeportamens
							? <Autocomplete
								multiple
								className="deportamen_choise-multi"
								options={optionsDeportamens}
								groupBy={(option) => option && option.firstLetter}
								getOptionLabel={(option) => option && option.title}
								sx={{ width: 350 }}
								renderInput={(params) => <TextField {...params} label="Выберите депортамент" />}
								renderGroup={(params) => (
									<li key={params.key}>
										<GroupHeader>{params.group}</GroupHeader>
										<GroupItems>{params.children}</GroupItems>
									</li>
								)}
								onChange={handleCityChange}
							/>
							: "Требуется выгрузка депортаментов из айко"
					}
				</div>
				<div className="datepicker">

					<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ru as unknown}
						localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}>
						<DatePicker
							views={['year']}

							label="Выберите год"

							defaultValue={dayjs()}
							onChange={setSelectedYear}
						/>
					</LocalizationProvider>
				</div>
			</div>


		</>

	);
}