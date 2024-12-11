import { SettingDatePicker } from "features/dateFinModel/ui/SettingDatePicker"
import { FC, useEffect, useState } from "react"
import { useCaseFinModel } from "../hooks/useCaseFinModel"
import { RageDateFinModel } from "features/dateFinModel"
import { IgroopsDep } from "features/deportamensListChoise/types/groopsdeportemets.type"
import React from "react"
import { FinModelTable } from "./FinModelTable.ui"
import { FinModelMetrics } from "./FinModelMetrics.ui"
import { IpointList } from "@shared/@types/points.type"
import { FinModelTableWidget } from "./FinModelTableWidget"
import dayjs from 'dayjs';

type IProps = {
	deportament: any
	widgetMouth: boolean
}

export const FinModelContext = React.createContext<any>({});
export const HOCDetailedfinModel: FC<IProps> = ({ widgetMouth, deportament }) => {
	const useCase = useCaseFinModel(deportament)
	const { setRageMouth } = useCase

	useEffect(() => {
		if (!widgetMouth) {
			setRageMouth({
				mounthDateCurrent: dayjs().format('YYYY-MM'),
				mounthDatePrevious: dayjs().subtract(1, 'month').format('YYYY-MM')
			})
		}
	}, [widgetMouth, deportament])

	return (
		<>
			{
				widgetMouth &&
				<FinModelContext.Provider value={useCase}>
					<RageDateFinModel set={setRageMouth} />
					<FinModelTable />
					<FinModelMetrics deportament={deportament} />
				</FinModelContext.Provider>
			}
			{
				!widgetMouth &&
				<FinModelContext.Provider value={useCase}>
					<RageDateFinModel set={setRageMouth} />
					<FinModelMetrics deportament={deportament} />
					<FinModelTableWidget deportament={deportament} />

				</FinModelContext.Provider>
			}




		</>
	)
}