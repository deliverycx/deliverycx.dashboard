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

	async rageFinModel(mouthArr: string[]) {
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
			{ $unwind: { path: "$departamentData", preserveNullAndEmptyArrays: true } },
			// Шаг 3: Фильтруем `paramsModel` по месяцам "2024-10" и "2024-09"
			{
				$addFields: {
					filteredParams: {
						$filter: {
							input: "$paramsModel",
							as: "param",
							cond: { $in: ["$$param.mouth", mouthArr] } //[currenMouth, prevMouth]
						}
					}
				}
			},
			// Шаг 4: Разворачиваем `filteredParams`
			{ $unwind: { path: "$filteredParams", preserveNullAndEmptyArrays: true } },
			// Шаг 5: Добавляем новые поля с результатами вычислений

			{
				$addFields: {
					profitDifferenceOpening: {
						$cond: {
							if: {
								$and: [
									{ $ne: ["$departamentData.finmodel.profit.opening", undefined] },
									{ $ne: ["$filteredParams.metric.profitSum", undefined] }
								]
							},
							then: {
								$subtract: [
									{
										$convert: {
											input: "$filteredParams.metric.profitSum",
											to: "double",
											onError: null,
											onNull: null
										}
									},
									{
										$convert: {
											input: "$departamentData.finmodel.profit.opening",
											to: "double",
											onError: null,
											onNull: null
										}
									}

								]
							},
							else: null
						}
					},
					profitDifferencePlan: {
						$cond: {
							if: {
								$and: [
									{ $ne: ["$filteredParams.metric.profitSumProcent", undefined] },
									{ $ne: ["$departamentData.finmodel.profit.plan", undefined] }
								]
							},
							then: {
								$subtract: [
									{
										$convert: {
											input: "$filteredParams.metric.profitSumProcent",
											to: "double",
											onError: null,
											onNull: null
										}
									},
									{
										$convert: {
											input: "$departamentData.finmodel.profit.plan",
											to: "double",
											onError: null,
											onNull: null
										}
									}
								]
							},
							else: null
						}
					},
					currentDeportamets: {
						$ifNull: ["$departamentData.currentDeportamets", "default value"]
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
					typemodel: "$departamentData.setting.typemodel",
					profitDifferenceOpening: 1,
					profitDifferencePlan: 1
				}
			}
		]);
	}
}