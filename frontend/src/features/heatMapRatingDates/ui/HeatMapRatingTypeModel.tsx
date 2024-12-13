import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import "./HeatMapRatingTypeModel.style.scss"
import { FC, useEffect, useState } from "react";

export const HeatMapRatingTypeModel: FC<{ set: any }> = ({ set }) => {
	const [modelselect, setModelSelect] = useState('');

	const handleChange = (event: SelectChangeEvent) => {
		setModelSelect(event.target.value);
		set(event.target.value)

	};

	return (
		<div className="typemodel">
			<h3>Тип финансовой модели</h3>
			<FormControl className="typemodel_select">
				<InputLabel id="demo-simple-select-label">выберите модель</InputLabel>
				<Select

					value={modelselect}
					onChange={handleChange}
					label="Тип фин модели"
				>
					<MenuItem value="">
						Все заведения
					</MenuItem>
					<MenuItem key="regions" value="regions">
						Регионы
					</MenuItem>
					<MenuItem key="menu" value="menu">
						Повышеное меню
					</MenuItem>
					<MenuItem key="moscow" value="moscow">
						Москва
					</MenuItem>
				</Select>
			</FormControl>

		</div>
	)
}