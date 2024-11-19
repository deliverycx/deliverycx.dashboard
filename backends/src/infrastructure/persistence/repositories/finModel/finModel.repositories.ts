import { Injectable } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";
import { InjectModel } from "nestjs-typegoose";
import { FinModelModel } from "../../entities/finModel.model";

@Injectable()
export class FinModelRepositories {
	constructor(
		@InjectModel(FinModelModel) private readonly finModelModel: ReturnModelType<typeof FinModelModel>
	) { }

	async setFinModel(departamentid: string, finmodelData: any) {
		const result = await this.finModelModel.find({
			departamentid: departamentid,
			paramsModel: {
				$elemMatch: { mouth: finmodelData.mouth }
			}
		})
		console.log(result);
		if (!result || result.length === 0) {
			console.log('up');
			await this.finModelModel.findOneAndUpdate({
				departamentid: departamentid,
			}, {
				$addToSet: {
					paramsModel: finmodelData
				}

			},
				{
					upsert: true
				}
			)
		} else {
			console.log('dw');
			await this.finModelModel.findOneAndUpdate({
				departamentid: departamentid,
				"paramsModel.mouth": finmodelData.mouth
			}, {
				$set: {
					"paramsModel.$.model": finmodelData.model,
					"paramsModel.$.metric": finmodelData.metric
				}

			},
				{
					upsert: false
				}
			)
		}

	}



	async getFinModel(departamentid: string) {
		return await this.finModelModel.findOne({ departamentid })
	}

	/*
	.find({
	"paramsModel": {
		"$all": [
			{ "$elemMatch": { "mouth": "2024-10" } },
			{ "$elemMatch": { "mouth": "2024-09" } }
		]
	}
})*/

	async rageFinModel() {
		return await this.finModelModel.aggregate([
			// Шаг 1: Соединяем коллекции `departaments` и `finmodel` по `departamentid`
			{
				$lookup: {
					from: "departaments",
					localField: "departamentid",
					foreignField: "departamentid",
					as: "departamentData"
				}
			},
			// Шаг 2: Разворачиваем массив `departamentData`
			{ $unwind: "$departamentData" },
			// Шаг 3: Фильтруем `paramsModel` по месяцам "2024-10" и "2024-09"
			{
				$addFields: {
					filteredParams: {
						$filter: {
							input: "$paramsModel",
							as: "param",
							cond: { $in: ["$$param.mouth", ["2024-10", "2024-09"]] }
						}
					}
				}
			},
			// Шаг 4: Разворачиваем `filteredParams`
			{ $unwind: "$filteredParams" },
			// Шаг 5: Добавляем новые поля с результатами вычислений
			{
				$addFields: {
					profitDifferenceOpening: {
						$subtract: [
							{ $toDouble: "$departamentData.finmodel.profit.opening" },
							"$filteredParams.metric.profitSum"
						]
					},
					profitDifferencePlan: {
						$subtract: [
							{ $toDouble: "$filteredParams.metric.profitSumProcent" },
							{ $toDouble: "$departamentData.finmodel.profit.plan" }
						]
					}
				}
			},
			// Шаг 6: Выбираем только нужные поля
			{
				$project: {
					departamentid: 1,
					month: "$filteredParams.mouth",
					roalte: "$filteredParams.model.royalties.fact",
					profitSum: "$filteredParams.metric.profitSum",
					profitSumProcent: "$filteredParams.metric.profitSumProcent",
					profit: "$departamentData.finmodel.profit",
					profitDifferenceOpening: 1,
					profitDifferencePlan: 1
				}
			}
		]);
	}
}