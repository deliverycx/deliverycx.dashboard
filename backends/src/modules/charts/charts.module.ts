import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { ChartsControllers } from "src/controllers/charts/charts.controllers";
import { DeportamentsControllers } from "src/controllers/deportaments/deportaments.controllers";
import { DASHBORD_DB } from "src/infrastructure/configuration/config.mongodb";
import { DeportamentsModel } from "src/infrastructure/persistence/entities/departaments.model";
import { FinModelModel } from "src/infrastructure/persistence/entities/finModel.model";
import { SredniyChekModel } from "src/infrastructure/persistence/entities/sredniychek.model";
import { ChartsRepositories } from "src/infrastructure/persistence/repositories/charts/charts.repositories";
import { DeportamentsRepositories } from "src/infrastructure/persistence/repositories/deportaments/deportaments.repositories";
import { DeportamentsCommands } from "src/interfaces/commands/deportaments/deportaments.commands";
import { ChartsQueries } from "src/interfaces/queries/charts/charts.queries";
import { DeportamentsQueries } from "src/interfaces/queries/deportaments/deportaments.queries";

@Module({
	imports: [
		TypegooseModule.forFeature([FinModelModel], DASHBORD_DB),
	],
	controllers: [ChartsControllers],
	providers: [
		ChartsRepositories,
		ChartsQueries,
	],
})
export class ChartsModule { }