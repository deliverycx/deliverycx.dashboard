import { FC, useContext, useState } from "react"
import { FinModelContext } from "./HOC.DetailedfinModel.ui"
import { inputFromNameFinModel } from "entities/deportamentsFinModel/entity/finModelDomain";
import { FinModelIndicatorPerfomans, FinModelIndicatorTrend } from "features/finModelIndicator/indext";
import "./finModel.scss"
import { IgroopsDep } from "features/deportamensListChoise/types/groopsdeportemets.type";
import { FinModelPrevPeriod } from "features/finModelIndicator/ui/FinModelPrevPeriod";
import styled from "styled-components"
import { Popper, Box } from "@mui/material";

export const FinModelTable = () => {
	const useCase = useContext(FinModelContext)
	const { finModelIndicatorFormatter } = useCase



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



				</div>

			)
		})
	}




	return (

		<>
			<div className="fintable-container">
				<div className="header">Показатель</div>

				<div className="header">Доля в затратах</div>
				<div className="header">Факт в %</div>
				<div className="header">% отклонения от среднего</div>



				<div className="rows">
					{
						finModelIndicatorFormatter &&
						TableFild()
					}
				</div>

			</div>




		</>

	)
}


const Perfomans_Item = styled.a<{ isActive: "red" | "green" }>`
  background-color: ${({ isActive }) =>
		isActive === "red" ? "#cbe5d6" : isActive === "green" ? "#fce2ce" : ""};

`;