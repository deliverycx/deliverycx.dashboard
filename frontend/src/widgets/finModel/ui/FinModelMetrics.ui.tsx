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
	const useMetricInd = useIndicatorMetrics(finModelIndicatorFormatter, deportament.finmodel)

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
								<MetricsTrend current={useMetricInd.viruka.currentMetric} previos={useMetricInd.viruka.previosMetric} />
							</div>
						}

					</div>
					<div className="widgets_metrics">
						<h4>Расходы (₽ мес)</h4>
						<h2 className="widgets_colum-number">{currentMouthFinModelMetrics.rashodSum}</h2>
						{
							useMetricInd.rashod &&
							<div className="metrics_item-indicator">
								<MetricsTrend current={useMetricInd.rashod.currentMetric} previos={useMetricInd.rashod.previosMetric} />
							</div>
						}
					</div>
					<div className="widgets_metrics">
						<h4>Прибыль (₽ мес)</h4>
						<h2 className="widgets_colum-number">{currentMouthFinModelMetrics.profitSum}</h2>
						{
							useMetricInd.profit &&
							<div className="metrics_item-indicator">
								<MetricsTrend current={useMetricInd.profit.currentMetric} previos={useMetricInd.profit.previosMetric} />
							</div>
						}
					</div>
					<div className="widgets_metrics">
						<h4>Прибыль (% мес)</h4>
						<h2 className="widgets_colum-number">{currentMouthFinModelMetrics.profitSumProcent}</h2>
						{
							useMetricInd.profitProcent &&
							<div className="metrics_item-indicator">
								<MetricsTrend current={useMetricInd.profitProcent.currentMetric} previos={useMetricInd.profitProcent.previosMetric} />
							</div>
						}
					</div>
				</div>
			}

		</>
	)
}