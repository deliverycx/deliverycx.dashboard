import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { DepartamentsUnloadControllers } from "src/controllers/unload/departamentsUnload.controllers";
import { DepartamentsUnloadServises } from "src/domain/services/unload/DepartamentsUnload.servises";
import { DASHBORD_DB } from "src/infrastructure/configuration/config.mongodb";
import { DeportamentsModel } from "src/infrastructure/persistence/entities/departaments.model";
import { SredniyChekModel } from "src/infrastructure/persistence/entities/sredniychek.model";
import { DeportamentsUnloadRepositories } from "src/infrastructure/persistence/repositories/unload/deportamentsUnload.repositories";
import { IIkkoDeliveryRequest } from "src/infrastructure/services/api/iikko/iikkoDelivery.request";
import { IIkkoRestoRequest } from "src/infrastructure/services/api/iikko/iikkoResto.request";
import { UnloadCommands } from "src/interfaces/commands/unload/unload.commands";
import { UndloadQueries } from "src/interfaces/queries/unloads/unloads.queries";

@Module({
	imports: [
		TypegooseModule.forFeature([DeportamentsModel, SredniyChekModel], DASHBORD_DB),
	],
	controllers: [DepartamentsUnloadControllers],
	providers: [
		DepartamentsUnloadServises,
		IIkkoRestoRequest,
		IIkkoDeliveryRequest,
		UnloadCommands,
		DeportamentsUnloadRepositories,
		UndloadQueries
	],
})
export class DepartamentsUnloadModule { }