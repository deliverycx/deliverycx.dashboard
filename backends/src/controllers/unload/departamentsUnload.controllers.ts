import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { RequestDTOUnloadParams } from "src/application/dto/unload/deportaments.dto";
import { DepartamentsUnloadServises } from "src/domain/services/unload/DepartamentsUnload.servises";
import { UnloadCommands } from "src/interfaces/commands/unload/unload.commands";
import { UndloadQueries } from "src/interfaces/queries/unloads/unloads.queries";

@Controller('unload')
export class DepartamentsUnloadControllers {
	constructor(
		private readonly unloadCommands: UnloadCommands,
		private readonly undloadQueries: UndloadQueries
	) { }

	@Get('departaments_unload')
	async departaments() {
		return await this.unloadCommands.saveDeportaments()
	}

	@Get('params')
	async getUnloadParam(@Query() query: { deportament: string }) {
		return await this.undloadQueries.queryDeportamenData(query.deportament)
	}

	@Post('unloadParams')
	async unloadALL(@Body() body: RequestDTOUnloadParams) {
		console.log('start unload', body.paramKeys, body.mounth);
		switch (body.paramKeys) {
			case "averageCheck": {
				await this.unloadCommands.saveSredniychek(body.mounth, body.deportamentid)
				return { status: true }
			}

			case "monthlyCheckCount": {
				this.unloadCommands.saveSredniychekMounth(body.mounth, body.deportamentid)
				return { status: true }
			}
			case "averageDailyRevenue": {
				await this.unloadCommands.saveVyruchkaMounth(body.mounth)
				return { status: true }
			}
		}
	}
}