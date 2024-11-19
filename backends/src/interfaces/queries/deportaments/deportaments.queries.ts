import { Injectable } from "@nestjs/common";
import { DeportamentsRepositories } from "src/infrastructure/persistence/repositories/deportaments/deportaments.repositories";

@Injectable()
export class DeportamentsQueries {
	constructor(
		private readonly deportamentsRepositories: DeportamentsRepositories
	) { }

	queryDeportamensList() {
		return this.deportamentsRepositories.deportamentsList()
	}
	queryDeportamen(deportamentid: string) {
		return this.deportamentsRepositories.findDeportament(deportamentid)
	}

}