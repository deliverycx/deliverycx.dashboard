import { Injectable } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";
import { InjectModel } from "nestjs-typegoose";
import { DeportamentsModel } from "../../entities/departaments.model";
import { SredniyChekModel } from "../../entities/sredniychek.model";
import { FinModelModel } from "../../entities/finModel.model";

@Injectable()
export class ChartsRepositories {
	constructor(
		@InjectModel(FinModelModel) private readonly finModelModel: ReturnModelType<typeof FinModelModel>
	) { }



	async chartsRageMounth(id: string, year: string) {
		const result = await this.finModelModel.aggregate([
			{
				$match: {
					departamentid: id
				}
			},

			{
				$project: {
					paramsModel: 1
				}
			},
			{
				$unwind: "$paramsModel"
			},
			{
				$match: {
					$expr: {
						$eq: [{ $substr: ["$paramsModel.mouth", 0, 4] }, year]
					}
				}
			},
			{
				$sort: {
					"paramsModel.mouth": 1 // Сортировка по полю mouth в порядке возрастания
				}
			},
			{
				$group: {
					_id: null,
					averageCheckDates: {
						$push: {
							$cond: [
								{ $ifNull: ["$paramsModel.model.averageCheck.factrub", false] },
								"$paramsModel.mouth",
								null
							]
						}
					},
					averageCheckValues: {
						$push: {
							$cond: [
								{ $ifNull: ["$paramsModel.model.averageCheck.factrub", false] },
								{ $toDouble: "$paramsModel.model.averageCheck.factrub" },
								null
							]
						}
					},
					averageDailyRevenueDates: {
						$push: {
							$cond: [
								{ $ifNull: ["$paramsModel.model.averageDailyRevenue.factrub", false] },
								"$paramsModel.mouth",
								null
							]
						}
					},
					averageDailyRevenueValues: {
						$push: {
							$cond: [
								{ $ifNull: ["$paramsModel.model.averageDailyRevenue.factrub", false] },
								{ $toDouble: "$paramsModel.model.averageDailyRevenue.factrub" },
								null
							]
						}
					},
					dailyCheckCountDates: {
						$push: {
							$cond: [
								{ $ifNull: ["$paramsModel.model.dailyCheckCount.factrub", false] },
								"$paramsModel.mouth",
								null
							]
						}
					},
					dailyCheckCountValues: {
						$push: {
							$cond: [
								{ $ifNull: ["$paramsModel.model.dailyCheckCount.factrub", false] },
								{ $toDouble: "$paramsModel.model.dailyCheckCount.factrub" },
								null
							]
						}
					},
					monthlyCheckCountDates: {
						$push: {
							$cond: [
								{ $ifNull: ["$paramsModel.model.monthlyCheckCount.factrub", false] },
								"$paramsModel.mouth",
								null
							]
						}
					},
					monthlyCheckCountValues: {
						$push: {
							$cond: [
								{ $ifNull: ["$paramsModel.model.monthlyCheckCount.factrub", false] },
								{ $toDouble: "$paramsModel.model.monthlyCheckCount.factrub" },
								null
							]
						}
					}
				}
			},
			{
				$project: {
					averageCheck: {
						dates: { $filter: { input: "$averageCheckDates", as: "item", cond: { $ne: ["$$item", null] } } },
						values: { $filter: { input: "$averageCheckValues", as: "item", cond: { $ne: ["$$item", null] } } }
					},
					averageDailyRevenue: {
						dates: { $filter: { input: "$averageDailyRevenueDates", as: "item", cond: { $ne: ["$$item", null] } } },
						values: { $filter: { input: "$averageDailyRevenueValues", as: "item", cond: { $ne: ["$$item", null] } } }
					},
					dailyCheckCount: {
						dates: { $filter: { input: "$dailyCheckCountDates", as: "item", cond: { $ne: ["$$item", null] } } },
						values: { $filter: { input: "$dailyCheckCountValues", as: "item", cond: { $ne: ["$$item", null] } } }
					},
					monthlyCheckCount: {
						dates: { $filter: { input: "$monthlyCheckCountDates", as: "item", cond: { $ne: ["$$item", null] } } },
						values: { $filter: { input: "$monthlyCheckCountValues", as: "item", cond: { $ne: ["$$item", null] } } }
					}
				}
			}
		]);



		return result
	}



	async chartsMultiRageMounth(arrayOfIds: string[]) {
		const matchStage = arrayOfIds.length > 0
			? { departamentid: { $in: arrayOfIds } }
			: {}; // пустой объект, если массив пустой

		const result = await this.finModelModel.find(matchStage)
		return result
	}


}
/** 7978 672 07 89
 * aggregate([
			{
				$match: {
					departamentid: "0381784e-2686-4cb0-b904-1e8d062f116a"
				}
			},
			{
				$project: {
					_id: 0,
					averageCheck: {
						dates: {
							$map: {
								input: "$averageCheck",
								as: "item",
								in: "$$item.date"
							}
						},
						values: {
							$map: {
								input: "$averageCheck",
								as: "item",
								in: "$$item.average"
							}
						}
					},
					averageDailyRevenue: {
						dates: {
							$map: {
								input: "$averageDailyRevenue",
								as: "item",
								in: "$$item.date"
							}
						},
						values: {
							$map: {
								input: "$averageDailyRevenue",
								as: "item",
								in: "$$item.average"
							}
						}
					},
					dailyCheckCount: {
						dates: {
							$map: {
								input: "$dailyCheckCount",
								as: "item",
								in: "$$item.date"
							}
						},
						values: {
							$map: {
								input: "$dailyCheckCount",
								as: "item",
								in: "$$item.average"
							}
						}
					},
					monthlyCheckCount: {
						dates: {
							$map: {
								input: "$monthlyCheckCount",
								as: "item",
								in: "$$item.date"
							}
						},
						values: {
							$map: {
								input: "$monthlyCheckCount",
								as: "item",
								in: "$$item.average"
							}
						}
					}
				}
			},
			{
				$group: {
					_id: null,
					averageCheck: { $first: "$averageCheck" },
					averageDailyRevenue: { $first: "$averageDailyRevenue" },
					dailyCheckCount: { $first: "$dailyCheckCount" },
					monthlyCheckCount: { $first: "$monthlyCheckCount" }
				}
			},
			{
				$project: {
					_id: 0,
					averageCheck: 1,
					averageDailyRevenue: 1,
					dailyCheckCount: 1,
					monthlyCheckCount: 1
				}
			}
		])
 */