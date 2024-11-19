import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { DeportamentsControllers } from "src/controllers/deportaments/deportaments.controllers";
import { DASHBORD_DB } from "src/infrastructure/configuration/config.mongodb";
import { DeportamentsModel } from "src/infrastructure/persistence/entities/departaments.model";
import { SredniyChekModel } from "src/infrastructure/persistence/entities/sredniychek.model";
import { DeportamentsRepositories } from "src/infrastructure/persistence/repositories/deportaments/deportaments.repositories";
import { DeportamentsCommands } from "src/interfaces/commands/deportaments/deportaments.commands";
import { DeportamentsQueries } from "src/interfaces/queries/deportaments/deportaments.queries";

@Module({
	imports: [
		TypegooseModule.forFeature([DeportamentsModel, SredniyChekModel], DASHBORD_DB),
	],
	controllers: [DeportamentsControllers],
	providers: [
		DeportamentsRepositories,
		DeportamentsQueries,
		DeportamentsCommands
	],
})
export class DepartamentsModule { }