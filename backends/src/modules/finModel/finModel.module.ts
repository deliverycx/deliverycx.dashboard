import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { FinModelControllers } from "src/controllers/finModel/finModel.controllers";
import { DASHBORD_DB } from "src/infrastructure/configuration/config.mongodb";
import { FinModelModel } from "src/infrastructure/persistence/entities/finModel.model";
import { FinModelRepositories } from "src/infrastructure/persistence/repositories/finModel/finModel.repositories";
import { FinModelSerivses } from "src/infrastructure/services/finModelServises/finModel.servises";
import { FinModelCommands } from "src/interfaces/commands/finModel/finModel.commands";
import { FinModelQueries } from "src/interfaces/queries/finModel/finModel.queries";

@Module({
	imports: [
		TypegooseModule.forFeature([FinModelModel], DASHBORD_DB),
	],
	controllers: [FinModelControllers],
	providers: [
		FinModelRepositories,
		FinModelCommands,
		FinModelQueries,
		FinModelSerivses
	],
})
export class FinModelModule { }