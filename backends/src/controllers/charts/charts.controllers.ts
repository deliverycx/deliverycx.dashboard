import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { IIkkoDeliveryRequest } from "src/infrastructure/services/api/iikko/iikkoDelivery.request";
import { IIkkoRestoRequest } from "src/infrastructure/services/api/iikko/iikkoResto.request";
import { ChartsMultipliServies } from "src/infrastructure/services/charts/chartsMultipli.servises";
import { ChartsQueries } from "src/interfaces/queries/charts/charts.queries";

@Controller('charts')
export class ChartsControllers {
	constructor(
		private readonly chartsQueries: ChartsQueries,
	) { }

	@Get('chart')
	async chart(@Query() query: { deportamentid: string, year: string },) {
		return this.chartsQueries.queryChartsDeportametMouthList(query.deportamentid, query.year)
	}
	@Post('chart')
	async chartPost(@Body() body: { deportamets: string[], year: string },) {
		const result = await this.chartsQueries.queryChartsDeportametMouthList(body.deportamets, body.year)
		const chartsMult = new ChartsMultipliServies(result)
		return chartsMult.chartMulptModel()
	}
}

