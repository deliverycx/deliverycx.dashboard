import { Injectable } from "@nestjs/common";
import { FinModelRepositories } from "src/infrastructure/persistence/repositories/finModel/finModel.repositories";

@Injectable()
export class FinModelCommands {
	constructor(
		private readonly finModelRepositories: FinModelRepositories
	) { }

	createParamsFinModel(deportamentid: string, mouth: string, finmodelData: any) {
		const finModelMouth = {
			mouth,
			model: finmodelData.model,
			metric: finmodelData.metric
		}
		return this.finModelRepositories.setFinModel(deportamentid, finModelMouth)
	}
}