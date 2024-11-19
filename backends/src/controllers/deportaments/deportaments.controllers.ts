import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { DeportamentsCommands } from "src/interfaces/commands/deportaments/deportaments.commands";
import { DeportamentsQueries } from "src/interfaces/queries/deportaments/deportaments.queries";


@Controller('deportaments')
export class DeportamentsControllers {
	constructor(
		private readonly deportamentsQueries: DeportamentsQueries,
		private readonly deportamentsCommands: DeportamentsCommands
	) { }

	@Get('deportamentsList')
	async getDeportaments() {
		return await this.deportamentsQueries.queryDeportamensList()
	}

	@Get('deportamentData')
	async getDeportamentData(@Query() query: { deportament: string }) {
		return await this.deportamentsQueries.queryDeportamen(query.deportament)
	}

	@Post('deportamenDataInfo')
	async deportamentDataInfo(
		@Query() query: { tabs: 'info' | 'finmodel', deportamentid: string },
		@Body() body: any
	) {
		return await this.deportamentsCommands.createDeportamentINFOModel(query.tabs, query.deportamentid, body)
	}
}