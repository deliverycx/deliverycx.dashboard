import { Injectable } from "@nestjs/common";
import { DeportamentsRepositories } from "src/infrastructure/persistence/repositories/deportaments/deportaments.repositories";
import { DeportamentsUnloadRepositories } from "src/infrastructure/persistence/repositories/unload/deportamentsUnload.repositories";

@Injectable()
export class UndloadQueries {
	constructor(
		private readonly deportamentsRepositories: DeportamentsUnloadRepositories
	) { }


	queryDeportamenData(deportamentid: string) {
		return this.deportamentsRepositories.unloadData(deportamentid)
	}
}