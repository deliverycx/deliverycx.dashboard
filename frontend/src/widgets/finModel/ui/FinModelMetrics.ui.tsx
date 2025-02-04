import { IgroopsDep } from "features/deportamensListChoise/types/groopsdeportemets.type"
import { FC, useContext } from "react"
import { FinModelContext } from "./HOC.DetailedfinModel.ui"
import { useIndicatorMetrics } from "../hooks/useIndicatorMetrics"
import { MetricsTrend } from "features/finModelIndicator/ui/MetricsTrend.ui"
import { WidgetsColum } from "@shared/ui/widgets/WidgetsColumColor"
import { IpointList } from "@shared/@types/points.type"


export const FinModelMetrics: FC<{ deportament: IgroopsDep | IpointList }> = ({ deportament }) => {
	const useCase = useContext(FinModelContext)
	const { finModelIndicatorFormatter, currentMouthFinModelMetrics } = useCase
	const useMetricInd = useIndicatorMetrics(currentMouthFinModelMetrics, deportament.finmodel)

	console.log(currentMouthFinModelMetrics);
	return (
		<>
			{
				currentMouthFinModelMetrics &&
				<div className="metrics">
					<div className="widgets_metrics">
						<h4 >Выручка (₽ мес)</h4>
						<h2 className="widgets_colum-number">{currentMouthFinModelMetrics.virukaSum}</h2>
						{
							useMetricInd.viruka &&
							<div className="metrics_item-indicator">
								<MetricsTrend current={useMetricInd.viruka} />
							</div>
						}

					</div>
					<div className="widgets_metrics">
						<h4>Расходы (₽ мес)</h4>
						<h2 className="widgets_colum-number">{currentMouthFinModelMetrics.rashodSum}</h2>
						{
							useMetricInd.rashod &&
							<div className="metrics_item-indicator">
								<MetricsTrend current={useMetricInd.rashod} />
							</div>
						}
					</div>
					<div className="widgets_metrics">
						<h4>Прибыль (₽ мес)</h4>
						<h2 className="widgets_colum-number">{currentMouthFinModelMetrics.profitSum}</h2>
						{
							useMetricInd.profit &&
							<div className="metrics_item-indicator">
								<MetricsTrend current={useMetricInd.profit} />
							</div>
						}
					</div>
					<div className="widgets_metrics">
						<h4>Прибыль (% мес)</h4>
						<h2 className="widgets_colum-number">{currentMouthFinModelMetrics.profitSumProcent}</h2>
						{
							useMetricInd.profitProcent &&
							<div className="metrics_item-indicator">
								<MetricsTrend current={useMetricInd.profitProcent} />
							</div>
						}
					</div>
				</div>
			}

		</>
	)
}