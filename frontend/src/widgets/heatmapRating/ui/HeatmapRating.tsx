import "./HeatmapRating.scss";

import { useRequestGeneralRatingFinModel } from "widgets/heatmapRating/hooks/requestGeneralRatingFinModel";
import { useCaseColorRating } from "../hooks/useCaseColorRating";
import { ColorGradientMapRating } from "entities/generalMapRating";
import { keyDifferenceRatingParams } from "entities/generalMapRating/types/colorRating.type";
import { usePointsListRequest } from "entities/pointListEntity";
import { useContext } from "react";
import React from "react";
import { DeportamentsTableColorGeneral } from "features/deportamentsTable/ui/DeportamentsTableColorGeneral";
import { DateMouth, HeatMapRatingDatesTable } from "features/heatMapRatingDates";
import { HeatMapRatingTypeModel } from "features/heatMapRatingDates/ui/HeatMapRatingTypeModel";
import { Button } from "@mui/material";

export const DeportametListContext = React.createContext<any>({
	deportaments: []
})
export const HeatmapRating = () => {
	const { handlerCurrentDate, mapRating, setTypeModel, setCurrentDate } = useRequestGeneralRatingFinModel()
	const { pointList } = usePointsListRequest()
	const useCase = useCaseColorRating(mapRating)
	const { handlerChoiseRating } = useCase

	return (
		<>
			<div className="heatmap_seting">
				<div className="heatmap_seting_box">
					<HeatMapRatingDatesTable set={setCurrentDate} />
					<HeatMapRatingTypeModel set={setTypeModel} />

				</div>
				<Button variant="contained" size="medium" onClick={handlerCurrentDate} >	Показать</Button>

			</div>



			{
				mapRating && pointList &&
				<DeportametListContext.Provider value={{ deportaments: pointList, mapRating: mapRating }}>
					<div className="heatmap">
						<h1 className="t1_title">Количество заведений по прибыли (в руб)</h1>
						<ColorGradientMapRating
							currenMapRating={mapRating.currenDeportamets.length !== 0 ? handlerChoiseRating(mapRating.currenDeportamets, keyDifferenceRatingParams.profitDifferenceOpening) : []}
							prevMapRating={mapRating.prevDeportamens.length !== 0 ? handlerChoiseRating(mapRating.prevDeportamens, keyDifferenceRatingParams.profitDifferenceOpening) : []}
							keyMap={keyDifferenceRatingParams.profitDifferenceOpening}
						/>
					</div>
					<div className="heatmap">
						<h1 className="t1_title">Количество заведений по прибыли (в %)</h1>
						<ColorGradientMapRating
							currenMapRating={mapRating.currenDeportamets.length !== 0 ? handlerChoiseRating(mapRating.currenDeportamets, keyDifferenceRatingParams.profitDifferencePlan) : []}
							prevMapRating={mapRating.prevDeportamens.length !== 0 ? handlerChoiseRating(mapRating.prevDeportamens, keyDifferenceRatingParams.profitDifferencePlan) : []}
							keyMap={keyDifferenceRatingParams.profitDifferencePlan}
						/>
					</div>
					<div className="general_rating">
						<h1 className="general_rating_title">Общий рейтинг</h1>
						<DeportamentsTableColorGeneral handlerColorList={handlerChoiseRating} deportametColorList={mapRating.currenDeportamets} />
					</div>
				</DeportametListContext.Provider>
			}

		</>

	);
};
