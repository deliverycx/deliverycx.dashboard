import { Injectable } from "@nestjs/common";
import { ChartsRepositories } from "src/infrastructure/persistence/repositories/charts/charts.repositories";

@Injectable()
export class ChartsQueries {
	constructor(
		private readonly chartsRepositories: ChartsRepositories
	) { }

	queryChartsDeportametMouthList(deportamentid: string | string[]) {

		if (typeof deportamentid === 'string') {
			return this.chartsRepositories.chartsRageMounth(deportamentid)
		}
		if (Array.isArray(deportamentid)) {
			return this.chartsRepositories.chartsMultiRageMounth(deportamentid)
		}

	}

}