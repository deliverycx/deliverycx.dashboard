import { LineChart } from '@mui/x-charts/LineChart';
import { FC } from 'react';
import { useCaseCarts } from '../hooks/useCaseCharts';
import "./ChartsModel.style.scss"

type IProps = {
	chart: {
		dates: string[]
		values: number[]
	}
	settings: {
		color: string,
		lable: string
	}
}
export const ChartsModel: FC<IProps> = ({ chart, settings }) => {
	const {
		fullValueInMounth,
		valueDateFormat,
		fullMounth,
		splitMouth,
		currentMounth
	} = useCaseCarts(chart)

	return (
		<div className="chart_box">
			<div className="chart_box_title">
				<div className="chart_box_title-lable">{settings.lable}</div>
				{
					currentMounth.value &&
					<div className="chart_box_title-metric">
						<span> {currentMounth.date} -  </span>
						<span>{currentMounth.value} ₽</span>
					</div>
				}

			</div>
			<LineChart

				xAxis={[
					{
						data: fullMounth(splitMouth),
						valueFormatter: valueDateFormat
					}
				]}
				series={[
					{
						data: fullValueInMounth(splitMouth),
						color: "#A5027C",

					}
				]}
				width={600}
				height={300}
				grid={{ horizontal: true }}
				margin={{ left: 70 }}
			/>
		</div>
	)
}