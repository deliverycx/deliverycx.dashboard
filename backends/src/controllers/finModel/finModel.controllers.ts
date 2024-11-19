import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { FinModelCommands } from "src/interfaces/commands/finModel/finModel.commands";
import { FinModelQueries } from "src/interfaces/queries/finModel/finModel.queries";

@Controller('finmodel')
export class FinModelControllers {
	constructor(
		private readonly finModelCommands: FinModelCommands,
		private readonly finModelQueries: FinModelQueries
	) { }

	@Post('paramsFinModel')
	async paramsfinmodel(
		@Query() query: { deportament: string, mouth: string },
		@Body() body: any
	) {
		return await this.finModelCommands.createParamsFinModel(query.deportament, query.mouth, body)
	}

	@Get('getParamsFinModel')
	getfinmodel(@Query() query: { deportament: string }) {
		return this.finModelQueries.queryFinModelData(query.deportament)
	}


	@Post('generalRating')
	async general(
		@Query() query: { deportament: string, mouth: string },
		@Body() body: { currenMouth: string, prevMouth: string }
	) {
		return await this.finModelQueries.queryGeneryData(body)
	}
}