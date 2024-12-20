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
	/*
		[
			{
				profitDifferenceOpening: 196095,
				profitDifferencePlan: -0.1999999999999993,
				mouth: '2024-07'
			},
			{
				profitDifferenceOpening: -46685,
				profitDifferencePlan: -1.4000000000000021,
				mouth: '2024-06'
			},
			{
				profitDifferenceOpening: -90657,
				profitDifferencePlan: -1.6999999999999993,
				mouth: '2024-05'
			},
			{
				profitDifferenceOpening: -178380,
				profitDifferencePlan: -2.400000000000002,
				mouth: '2024-04'
			}
		]
	*/
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

	async rageModelBuDeportament(deportament: string, mouthArr: string[]) {
		return await this.finModelModel.aggregate([
			{
				$match: {
					departamentid: deportament // Переданный departamentid
				}
			},
			{
				$lookup: {
					from: "departaments",
					localField: "departamentid",
					foreignField: "departamentid",
					as: "departamentData"
				}
			},
			// Разворачиваем массив `departamentData`
			{ $unwind: { path: "$departamentData", preserveNullAndEmptyArrays: true } },
			// Фильтруем `paramsModel` по месяцам
			{
				$addFields: {
					filteredParams: {
						$filter: {
							input: "$paramsModel",
							as: "param",
							cond: { $in: ["$$param.mouth", mouthArr] } // [currentMonth, prevMonth]
						}
					}
				}
			},
			// Разворачиваем `filteredParams`
			{ $unwind: { path: "$filteredParams", preserveNullAndEmptyArrays: true } },
			// Добавляем вычисляемые поля
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
							else: 0
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
							else: 0
						}
					}
				}
			},
			// Группировка по месяцам
			{
				$group: {
					_id: "$filteredParams.mouth", // Группировка по месяцу
					profitDifferenceOpening: { $sum: "$profitDifferenceOpening" },
					profitDifferencePlan: { $sum: "$profitDifferencePlan" }
				}
			},
			// Преобразование для нужного формата
			{
				$project: {
					_id: 0,
					mouth: "$_id",
					profitDifferenceOpening: 1,
					profitDifferencePlan: 1
				}
			},
			// Сортировка по месяцам (если требуется)
			{
				$sort: { mouth: -1 }
			}
		])
	}
}