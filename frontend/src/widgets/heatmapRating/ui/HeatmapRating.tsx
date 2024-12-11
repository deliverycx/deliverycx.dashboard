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

export const DeportametListContext = React.createContext<any>({
	deportaments: []
})
export const HeatmapRating = () => {
	const { handlerCurrentDate, mapRating } = useRequestGeneralRatingFinModel()
	const { pointList } = usePointsListRequest()
	const useCase = useCaseColorRating(mapRating)
	const { handlerChoiseRating } = useCase


	return (
		<>
			<HeatMapRatingDatesTable set={handlerCurrentDate} />

			{
				mapRating && pointList &&
				<DeportametListContext.Provider value={{ deportaments: pointList, mapRating: mapRating }}>
					<div className="heatmap">
						<h1 className="t1_title">Количество заведений по прибыли (в руб)</h1>
						<ColorGradientMapRating
							currenMapRating={handlerChoiseRating(mapRating.currenDeportamets, keyDifferenceRatingParams.profitDifferenceOpening)}
							prevMapRating={handlerChoiseRating(mapRating.prevDeportamens, keyDifferenceRatingParams.profitDifferenceOpening)}
							keyMap={keyDifferenceRatingParams.profitDifferenceOpening}
						/>
					</div>
					<div className="heatmap">
						<h1 className="t1_title">Количество заведений по прибыли (в %)</h1>
						<ColorGradientMapRating
							currenMapRating={handlerChoiseRating(mapRating.currenDeportamets, keyDifferenceRatingParams.profitDifferencePlan)}
							prevMapRating={handlerChoiseRating(mapRating.prevDeportamens, keyDifferenceRatingParams.profitDifferencePlan)}
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
