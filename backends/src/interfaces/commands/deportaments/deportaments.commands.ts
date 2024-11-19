import { Injectable } from "@nestjs/common";
import { DepartamentsUnloadServises } from "src/domain/services/unload/DepartamentsUnload.servises";
import { DeportamentsRepositories } from "src/infrastructure/persistence/repositories/deportaments/deportaments.repositories";
import { DeportamentsUnloadRepositories } from "src/infrastructure/persistence/repositories/unload/deportamentsUnload.repositories";

@Injectable()
export class DeportamentsCommands {
	constructor(
		private readonly deportamentsRepositories: DeportamentsRepositories
	) { }

	async createDeportamentINFOModel(tabs, deportamentid, body) {
		await this.deportamentsRepositories.deportamentInfo(tabs, deportamentid, body)
	}

}