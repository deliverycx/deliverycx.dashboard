import { FC, useState } from "react"
import dayjs from 'dayjs';
import "./DateMouth.style.scss"
import cn from "classnames"


export const DateMouth: FC<{ multipl: boolean, set: any }> = ({ multipl, set }) => {
	const [currenMouth, setCurrenMouth] = useState(dayjs().subtract(0, 'month'))

	const months = [
		{ value: "Январь", dates: dayjs().month(0) },
		{ value: "Февраль", dates: dayjs().month(1) },
		{ value: "Март", dates: dayjs().month(2) },
		{ value: "Апрель", dates: dayjs().month(3) },
		{ value: "Май", dates: dayjs().month(4) },
		{ value: "Июнь", dates: dayjs().month(5) },
		{ value: "Июль", dates: dayjs().month(6) },
		{ value: "Август", dates: dayjs().month(7) },
		{ value: "Сентябрь", dates: dayjs().month(8) },
		{ value: "Октябрь", dates: dayjs().month(9) },
		{ value: "Ноябрь", dates: dayjs().month(10) },
		{ value: "Декабрь", dates: dayjs().month(11) },
	];

	const handlerChoiseMouth = (value: any) => {
		setCurrenMouth(value)
		set(value)
	}



	return (
		<>
			<div className="date_mouth">
				{
					months.map((mouth) => {
						const CN = cn('date_mouth-item', { active: mouth.dates === currenMouth })
						console.log(mouth.value, currenMouth);
						return <span className={CN} onClick={() => handlerChoiseMouth(mouth.dates)}>{mouth.value}</span>
					})
				}

			</div>
		</>
	)
}