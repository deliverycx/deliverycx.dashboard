import { FC, useContext, useState } from "react"
import { FinModelContext } from "./HOC.DetailedfinModel.ui"
import { finModelEntity, inputFromNameFinModel } from "entities/deportamentsFinModel/entity/finModelDomain";
import { FinModelIndicatorPerfomans, FinModelIndicatorTrend } from "features/finModelIndicator/indext";
import "./finModel.scss"
import { IgroopsDep } from "features/deportamensListChoise/types/groopsdeportemets.type";
import { FinModelPrevPeriod } from "features/finModelIndicator/ui/FinModelPrevPeriod";
import styled from "styled-components"
import { IpointList } from "@shared/@types/points.type";
import { Popper, Box, PopperPlacementType } from "@mui/material";


export const FinModelTableWidget: FC<{ deportament: IpointList }> = ({ deportament }) => {
	const useCase = useContext(FinModelContext)
	const { finModelIndicatorFormatter } = useCase
	const deportamentFinModel = deportament.finmodel


	const TableFild = () => {
		return useCase.currentMouthFinModel && (Object.keys(useCase.currentMouthFinModel) as Array<keyof typeof inputFromNameFinModel>)
			.map((key) => {
				const finmodel = useCase.currentMouthFinModel
				const perfomans = finModelIndicatorFormatter.performanceIndicator(key)

				const cat = key as keyof typeof finModelEntity;

				return finModelEntity[cat].visible !== false && finModelEntity[cat].iikko !== true && (

					<tr>
						<td className="left-align">{inputFromNameFinModel[key]}</td>
						<td className="group-fact rub"><FinModelPrevPeriod keyFin={key} metod="factrub">
							{finmodel[key].factrub}
						</FinModelPrevPeriod></td>
						<td className="group-fact proc">
							<div className="finmodel_table_box cell">
								<FinModelPrevPeriod keyFin={key} metod="fact">
									{finmodel[key].fact}
								</FinModelPrevPeriod>
								<FinModelIndicatorTrend finKey={key} />
							</div>
						</td>
						<td className="group-model dol">
							<FinModelPrevPeriod keyFin={key} metod="costs">
								{finmodel[key].costs}
							</FinModelPrevPeriod>
						</td>
						<td className="group-model plan">
							{
								deportamentFinModel && deportamentFinModel[key].plan
							}
						</td>
						<td className="group-model open">
							{
								deportamentFinModel && deportamentFinModel[key].opening
							}
						</td>
						<td className="group-deviation">
							<Perfomans_Item className="finmodel_table_box cell" isActive={perfomans}>
								<FinModelPrevPeriod keyFin={key} metod="deviation">
									{finmodel[key].deviation}
								</FinModelPrevPeriod>
							</Perfomans_Item>
						</td>

					</tr>
				)
			})
	}



	const TableFildIKKO = () => {
		return useCase.currentMouthFinModel && (Object.keys(useCase.currentMouthFinModel) as Array<keyof typeof inputFromNameFinModel>)
			.map((key) => {
				const finmodel = useCase.currentMouthFinModel

				const cat = key as keyof typeof finModelEntity;

				return finModelEntity[cat].visible !== false && finModelEntity[cat].iikko === true && (

					<tr>
						<td className="left-align">{inputFromNameFinModel[key]}</td>
						<td className="group-fact rub">
							{finmodel[key].factrub}
						</td>
						<td className="group-model open">
							{
								deportamentFinModel && deportamentFinModel[key].opening
							}
						</td>


					</tr>
				)
			})
	}

	const [poper, setPoper] = useState(false)
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [placement, setPlacement] = useState<string>();

	const handleClick = (e: any, id: string) => {
		setAnchorEl(e.currentTarget);
		setPoper((prev) => placement !== id || !prev);
		setPlacement(id);
	}




	return (

		<div className="fintable_widget">
			<table>
				<tr>
					<th className="left-align">Показатели IIKKO</th>
					<th className="group-fact" >Факт, руб</th>
					<th className="group-model">Фин модель, открытие</th>
				</tr>
				{
					TableFildIKKO()
				}
			</table>

			<table>

				<tr>
					<th rowSpan={2} className="left-align">Показатели Фин-модель</th>
					<th colSpan={2} className="group-fact" >Факт</th>
					<th colSpan={3} className="group-model">Фин модель</th>

				</tr>
				<tr>
					<Popper open={poper} anchorEl={anchorEl} >
						<Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
							{
								placement === 'fact' && <span>выручка * доля в затратах / 100</span>
							}
							{
								placement === 'factrub' && <span>факт в руб, в месяце - факт в руб, при открытии = (полученное / факт руб, в месяце ) * 100</span>
							}
						</Box>
					</Popper>
					<th className="group-fact rub" onClick={e => handleClick(e, 'fact')}>руб</th>
					<th className="group-fact proc" onClick={e => handleClick(e, 'factrub')}>в %</th>
					<th className="group-model dol">Доля в затратах</th>
					<th className="group-model plan">План</th>
					<th className="group-model open">При открытии</th>
					<th className="group-deviation">% отклонения от среднего</th>
				</tr>
				{
					TableFild()
				}
			</table>
		</div>

	)
}


const Perfomans_Item = styled.div<{ isActive: "red" | "green" }>`
  background-color: ${({ isActive }) =>
		isActive === "red" ? "#cbe5d6" : isActive === "green" ? "#fce2ce" : ""};

`;


