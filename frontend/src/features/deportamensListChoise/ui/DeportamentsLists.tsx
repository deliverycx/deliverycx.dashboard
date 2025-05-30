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
	setter: React.Dispatch<React.SetStateAction<IgroopsDep | null>>
}


export const DeportamentsLists: React.FC<IProps> = ({ setter }) => {
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
								options={optionsDeportamens}
								groupBy={(option) => option && option.firstLetter}
								getOptionLabel={(option) => option && `${option.firstLetter}, ${option.title}`}
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
				<div className="deportamen_choise_unload">
					<MediumButton status={statusUnload}>
						<Button variant="text" endIcon={<CloudDownloadIcon />} onClick={unloadRequest}>Выгрузка депортаментов</Button>
					</MediumButton>
				</div>
			</div>


		</>

	);
}