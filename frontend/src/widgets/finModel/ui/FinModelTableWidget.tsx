import { FC, useContext } from "react"
import { FinModelContext } from "./HOC.DetailedfinModel.ui"
import { inputFromNameFinModel } from "entities/deportamentsFinModel/entity/finModelDomain";
import { FinModelIndicatorPerfomans, FinModelIndicatorTrend } from "features/finModelIndicator/indext";
import "./finModel.scss"
import { IgroopsDep } from "features/deportamensListChoise/types/groopsdeportemets.type";
import { FinModelPrevPeriod } from "features/finModelIndicator/ui/FinModelPrevPeriod";
import styled from "styled-components"
import { IpointList } from "@shared/@types/points.type";

export const FinModelTableWidget: FC<{ deportament: IpointList }> = ({ deportament }) => {
	const useCase = useContext(FinModelContext)
	const { finModelIndicatorFormatter } = useCase
	const deportamentFinModel = deportament.finmodel


	const TableFild = () => {
		return useCase.currentMouthFinModel && (Object.keys(useCase.currentMouthFinModel) as Array<keyof typeof inputFromNameFinModel>).map((key) => {
			const finmodel = useCase.currentMouthFinModel
			const perfomans = finModelIndicatorFormatter.performanceIndicator(key)

			return (
				<div className="row">
					<div className="finmodel_table_title cell">{inputFromNameFinModel[key]}</div>
					<div className="finmodel_table_box cell">
						<FinModelPrevPeriod keyFin={key} metod="factrub">
							{finmodel[key].factrub}
						</FinModelPrevPeriod>
					</div>
					<div className="finmodel_table_box cell">
						<FinModelPrevPeriod keyFin={key} metod="costs">
							{finmodel[key].costs}
						</FinModelPrevPeriod>
					</div>
					<div className="finmodel_table_box cell">
						<div className="prevperiod_box">
							{
								deportamentFinModel && deportamentFinModel[key].plan
							}
						</div>
					</div>
					<div className="finmodel_table_box cell">
						<FinModelPrevPeriod keyFin={key} metod="fact">
							{finmodel[key].fact}
						</FinModelPrevPeriod>
						<FinModelIndicatorTrend finKey={key} />
					</div>
					<Perfomans_Item className="finmodel_table_box cell" isActive={perfomans}>
						<FinModelPrevPeriod keyFin={key} metod="deviation">
							{finmodel[key].deviation}
						</FinModelPrevPeriod>
					</Perfomans_Item>
					<div className="finmodel_table_box cell">
						<div className="prevperiod_box">
							{
								deportamentFinModel && deportamentFinModel[key].opening
							}
						</div>

					</div>

				</div>

			)
		})
	}


	return (

		<div className="fintable_widget">
			<div className="fintable-container">
				<div className="header"></div>
				<div className="header">Факт, руб</div>
				<div className="header">Доля в затратах</div>
				<div className="header">План</div>
				<div className="header">Факт</div>
				<div className="header">% отклонения от среднего</div>
				<div className="header">Фин модель при открытии, руб</div>

				<div className="rows">
					{
						TableFild()
					}
				</div>

			</div>




		</div>

	)
}


const Perfomans_Item = styled.div<{ isActive: "red" | "green" }>`
  background-color: ${({ isActive }) =>
		isActive === "red" ? "#cbe5d6" : isActive === "green" ? "#fce2ce" : ""};

`;