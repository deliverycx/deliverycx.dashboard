import { Injectable } from "@nestjs/common";
import { deportamentMapper, SredniychekMapper, SredniychekMounthMapper, VyruchkaMounthMapper } from "src/application/mappers/unload/deportaments.mapper";
import { DepartamentsUnloadServises } from "src/domain/services/unload/DepartamentsUnload.servises";
import { DeportamentsUnloadRepositories } from "src/infrastructure/persistence/repositories/unload/deportamentsUnload.repositories";

@Injectable()
export class UnloadCommands {
	constructor(
		private readonly departamentsUnloadServises: DepartamentsUnloadServises,
		private readonly deportamentsRepositories: DeportamentsUnloadRepositories
	) { }

	async saveDeportaments() {
		const resultBody = await this.departamentsUnloadServises.getDepartametsFromIIKKO()
		//await this.saveSredniychekMounth()
		return this.deportamentsRepositories.deportamentsCreate(deportamentMapper(resultBody))
	}

	async saveSredniychek(mounth: string, deportament: string) {
		const result = await this.departamentsUnloadServises.getSredniychekFromIIKKO(mounth)
		await this.deportamentsRepositories.sredinychekCreate(SredniychekMapper(result))
		console.log('end unload saveSredniychek');
	}

	async saveSredniychekMounth(mounth: string, deportament: string) {
		const result = await this.departamentsUnloadServises.getSredniychekMouthFromIIKKO(mounth)
		await this.deportamentsRepositories.sredinychekMounthCreate(SredniychekMounthMapper(result))
		console.log('end unload saveSredniychek');
	}

	async saveVyruchkaMounth(mounth: string) {
		const result = await this.departamentsUnloadServises.vyruchkaMounthFromIIKKO(mounth)
		await this.deportamentsRepositories.vyruchkaMounthCreate(VyruchkaMounthMapper(result))
		console.log('end unload saveSredniychek');
	}
}