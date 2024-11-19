import { ReturnModelType } from "@typegoose/typegoose";
import { UsersModel } from "../../entities/users.model";
import { InjectModel } from "nestjs-typegoose";
import { DeportamentsModel } from "../../entities/departaments.model";
import { DeportamentsDto, SredniychekDto } from "src/application/dto/unload/deportaments.dto";
import { SredniyChekModel } from "../../entities/sredniychek.model";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DeportamentsUnloadRepositories {
	constructor(
		@InjectModel(DeportamentsModel) private readonly deportamentsModel: ReturnModelType<typeof DeportamentsModel>,
		@InjectModel(SredniyChekModel) private readonly sredniyChekModel: ReturnModelType<typeof SredniyChekModel>
	) { }

	async deportamentsCreate(body: DeportamentsDto[]) {
		body.map(async (value) => {
			return await this.deportamentsModel.findOneAndUpdate({
				departamentid: value.departamentid,
			},
				value,
				{
					upsert: true
				}
			);
		})

	}

	async sredinychekCreate(body: SredniychekDto[]) {
		body.map(async (value) => {

			await this.sredniyChekModel.findOneAndUpdate({
				departamentid: value.departamentid,
			},
				{

					$addToSet: {
						averageCheck: value.sredinychekdate
					}
				},
				{
					upsert: true
				}
			)

		})

	}

	async sredinychekMounthCreate(body: SredniychekDto[]) {
		return body.map(async (value) => {
			return await this.sredniyChekModel.findOneAndUpdate({
				departamentid: value.departamentid,
			},
				{

					$addToSet: {
						monthlyCheckCount: value.monthlyCheckCount,
						dailyCheckCount: value.dailyCheckCount
					}
				},
				{
					upsert: true,
					new: true
				}
			)

		})

	}

	async vyruchkaMounthCreate(body: SredniychekDto[]) {
		body.map(async (value) => {
			await this.sredniyChekModel.findOneAndUpdate({
				departamentid: value.departamentid,
			},
				{

					$addToSet: {
						averageRevenue: value.averageRevenue,
						averageDailyRevenue: value.averageDailyRevenue
					}
				},
				{
					upsert: true
				}
			)

		})

	}


	async unloadData(departamentid: string) {
		try {
			const result = await this.sredniyChekModel.aggregate([
				{
					$match: { departamentid } // фильтрация по уникальному departamentid
				},
				{
					$lookup: {
						from: 'finmodelIIKKO', // название коллекции с данными
						localField: 'departamentid', // поле в коллекции департамента
						foreignField: 'departamentid', // поле в коллекции с данными
						as: 'dataDetails' // результат присоединения
					}
				},
				{
					$unwind: '$dataDetails' // разворачиваем массив данных, если есть только один элемент
				},
				{
					$project: {
						departament: 1, // выбираем только нужные поля
						'dataDetails.averageCheck': 1,
						'dataDetails.monthlyCheckCount': 1,
						'dataDetails.dailyCheckCount': 1,
						'dataDetails.averageRevenue': 1,
						'dataDetails.averageDailyRevenue': 1
					}
				}
			]);

			return result && result[0]
		} catch (error) {
			console.error('Ошибка агрегации:', error);
		}
	}

}