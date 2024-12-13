import { FC, useState } from "react"
import dayjs from 'dayjs';
import "./DateMouth.style.scss"
import cn from "classnames"
import { Button, ButtonGroup } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';


export const DateMouth: FC<{ mounthList: string[], set: any }> = ({ mounthList, set }) => {

	const months = [
		{ value: "Январь", dates: dayjs().month(0).format('YYYY-MM') },
		{ value: "Февраль", dates: dayjs().month(1).format('YYYY-MM') },
		{ value: "Март", dates: dayjs().month(2).format('YYYY-MM') },
		{ value: "Апрель", dates: dayjs().month(3).format('YYYY-MM') },
		{ value: "Май", dates: dayjs().month(4).format('YYYY-MM') },
		{ value: "Июнь", dates: dayjs().month(5).format('YYYY-MM') },
		{ value: "Июль", dates: dayjs().month(6).format('YYYY-MM') },
		{ value: "Август", dates: dayjs().month(7).format('YYYY-MM') },
		{ value: "Сентябрь", dates: dayjs().month(8).format('YYYY-MM') },
		{ value: "Октябрь", dates: dayjs().month(9).format('YYYY-MM') },
		{ value: "Ноябрь", dates: dayjs().month(10).format('YYYY-MM') },
		{ value: "Декабрь", dates: dayjs().month(11).format('YYYY-MM') },
	];


	const handleRemoveDate = (dateToRemove: string) => {
		set(mounthList.filter((date: string) => date !== dateToRemove));
	};

	const findMouth = (mouth: string) => {
		const result = months.find((val) => val.dates === mouth)
		return result?.value || ''
	}

	return (
		<>
			<ButtonGroup className="date_mouth" variant="contained" aria-label="Basic button group">

				{
					mounthList.map((mouth) => {
						const CN = cn('date_mouth-item')

						return <Button variant="outlined" startIcon={<DeleteIcon />} className={CN} onClick={() => handleRemoveDate(mouth)}>
							{findMouth(mouth)}
							(<small>{mouth}</small>)
						</Button>


					})
				}

			</ButtonGroup>
		</>
	)
}