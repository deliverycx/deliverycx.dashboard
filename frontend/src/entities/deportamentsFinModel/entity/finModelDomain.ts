import { FomulsClassFinModel } from "./formulFinModel";

export const inputFromNameFinModel = {
	costPrice: 'Себестоимость',
	payrollFund: 'Фонд оплаты труда',
	rent: 'Аренда',
	utilities: 'Коммунальные услуги',
	consumablesAndDisposableDishes: 'Расходные средства и одноразовая посуда',
	equipmentMaintenance: 'Прочие расходы',
	marketing: 'Маркетинг',
	generalProductionExpenses: 'Общепроизводственные расходы',
	taxes: 'Налоги',
	royalties: 'Роялти',
	averageRevenue: 'Выручка',
	averageCheck: 'Средний чек',
	monthlyCheckCount: 'Количество чеков в месяц',
	dailyCheckCount: 'Количество чеков в день',
	averageDailyRevenue: 'Среднеднeвная выручка',
	profit: "Прибыль",
	expenses: "Расходы"
};

export const finModelEntity = {
	costPrice: {
		name: inputFromNameFinModel.costPrice,
		rashod: true,
		iikko: false,
		mark: FomulsClassFinModel.trendFormul("down"),
		lable: "%",
		colors: true,
		visible: true,
		formul: {
			factmodelData: FomulsClassFinModel.facktModel as any,
			deviationmodelData: FomulsClassFinModel.deviationModel as any,
			averageCostbyFact: FomulsClassFinModel.averageCostbyFact as any,
			averageFactbyCost: FomulsClassFinModel.averageFactbyCost as any
		},
		params: {
			factrub: 0,
			costs: 0,
			fact: 0,
			deviation: 0
		}
	},
	payrollFund: {
		name: inputFromNameFinModel.payrollFund,
		rashod: true,
		iikko: false,
		mark: FomulsClassFinModel.trendFormul("down"),
		lable: "%",
		colors: true,
		visible: true,
		formul: {
			factmodelData: FomulsClassFinModel.facktModel as any,
			deviationmodelData: FomulsClassFinModel.deviationModel as any,
			averageCostbyFact: FomulsClassFinModel.averageCostbyFact as any,
			averageFactbyCost: FomulsClassFinModel.averageFactbyCost as any
		},
		params: {
			factrub: 0,
			costs: 0,
			fact: 0,
			deviation: 0
		}
	},
	rent: {
		name: inputFromNameFinModel.rent,
		rashod: true,
		iikko: false,
		mark: FomulsClassFinModel.trendFormul("down"),
		lable: "%",
		colors: true,
		visible: true,
		formul: {
			factmodelData: FomulsClassFinModel.facktModel as any,
			deviationmodelData: FomulsClassFinModel.deviationModel as any,
			averageCostbyFact: FomulsClassFinModel.averageCostbyFact as any,
			averageFactbyCost: null
		},
		params: {
			factrub: 0,
			costs: 0,
			fact: 0,
			deviation: 0
		}
	},
	utilities: {
		name: inputFromNameFinModel.utilities,
		rashod: true,
		iikko: false,
		mark: FomulsClassFinModel.trendFormul("down"),
		lable: "%",
		colors: true,
		visible: true,
		formul: {
			factmodelData: FomulsClassFinModel.facktModel as any,
			deviationmodelData: FomulsClassFinModel.deviationModel as any,
			averageCostbyFact: FomulsClassFinModel.averageCostbyFact as any,
			averageFactbyCost: FomulsClassFinModel.averageFactbyCost as any
		},
		params: {
			factrub: 0,
			costs: 0,
			fact: 0,
			deviation: 0
		}
	},
	consumablesAndDisposableDishes: {
		name: inputFromNameFinModel.consumablesAndDisposableDishes,
		rashod: true,
		iikko: false,
		mark: FomulsClassFinModel.trendFormul("down"),
		lable: "%",
		colors: true,
		visible: false,
		formul: {
			factmodelData: FomulsClassFinModel.facktModel as any,
			deviationmodelData: FomulsClassFinModel.deviationModel as any,
			averageCostbyFact: FomulsClassFinModel.averageCostbyFact as any,
			averageFactbyCost: FomulsClassFinModel.averageFactbyCost as any
		},
		params: {
			factrub: 0,
			costs: 0,
			fact: 0,
			deviation: 0
		}
	},
	equipmentMaintenance: {
		name: inputFromNameFinModel.equipmentMaintenance,
		rashod: true,
		iikko: false,
		mark: FomulsClassFinModel.trendFormul("down"),
		colors: true,
		visible: true,
		lable: "%",
		formul: {
			factmodelData: FomulsClassFinModel.facktModel as any,
			deviationmodelData: FomulsClassFinModel.deviationModel as any,
			averageCostbyFact: FomulsClassFinModel.averageCostbyFact as any,
			averageFactbyCost: FomulsClassFinModel.averageFactbyCost as any
		},
		params: {
			factrub: 0,
			costs: 0,
			fact: 0,
			deviation: 0
		}
	},
	marketing: {
		name: inputFromNameFinModel.marketing,
		rashod: true,
		iikko: false,
		mark: FomulsClassFinModel.trendFormul("down"),
		colors: true,
		visible: true,
		lable: "%",
		formul: {
			factmodelData: FomulsClassFinModel.facktModel as any,
			deviationmodelData: FomulsClassFinModel.deviationModel as any,
			averageCostbyFact: FomulsClassFinModel.averageCostbyFact as any,
			averageFactbyCost: FomulsClassFinModel.averageFactbyCost as any
		},
		params: {
			factrub: 0,
			costs: 0,
			fact: 0,
			deviation: 0
		}
	},
	generalProductionExpenses: {
		name: inputFromNameFinModel.generalProductionExpenses,
		rashod: true,
		iikko: false,
		mark: FomulsClassFinModel.trendFormul("down"),
		colors: true,
		lable: "%",
		visible: false,
		formul: {
			factmodelData: FomulsClassFinModel.facktModel as any,
			deviationmodelData: FomulsClassFinModel.deviationModel as any,
			averageCostbyFact: FomulsClassFinModel.averageCostbyFact as any,
			averageFactbyCost: FomulsClassFinModel.averageFactbyCost as any
		},
		params: {
			factrub: 0,
			costs: 0,
			fact: 0,
			deviation: 0
		}
	},
	taxes: {
		name: inputFromNameFinModel.taxes,
		rashod: true,
		iikko: false,
		mark: FomulsClassFinModel.trendFormul("down"),
		colors: true,
		visible: true,
		lable: "%",
		formul: {
			factmodelData: FomulsClassFinModel.facktModel as any,
			deviationmodelData: FomulsClassFinModel.deviationModel as any,
			averageCostbyFact: FomulsClassFinModel.averageCostbyFact as any,
			averageFactbyCost: FomulsClassFinModel.averageFactbyCost as any
		},
		params: {
			factrub: 0,
			costs: 0,
			fact: 0,
			deviation: 0
		}
	},
	royalties: {
		name: inputFromNameFinModel.royalties,
		rashod: true,
		iikko: false,
		mark: FomulsClassFinModel.trendFormul("down"),
		colors: true,
		visible: true,
		lable: "%",
		formul: {
			factmodelData: FomulsClassFinModel.facktModel as any,
			deviationmodelData: FomulsClassFinModel.deviationModel as any,
			averageCostbyFact: FomulsClassFinModel.averageCostbyFact as any,
			averageFactbyCost: FomulsClassFinModel.averageFactbyCost as any
		},
		params: {
			factrub: 0,
			costs: 0,
			fact: 0,
			deviation: 0
		}
	},
	averageRevenue: {
		name: inputFromNameFinModel.averageRevenue,
		rashod: false,
		iikko: true,
		mark: FomulsClassFinModel.trendFormul("up"),
		colors: true,
		visible: true,
		lable: "руб",
		formul: null,
		params: {
			factrub: 0,
			costs: 0,
			fact: 0,
			deviation: 0
		}
	},
	averageCheck: {
		name: inputFromNameFinModel.averageCheck,
		rashod: false,
		iikko: true,
		mark: FomulsClassFinModel.trendFormul("up"),
		colors: true,
		visible: true,
		lable: "руб",
		formul: {
			factmodelData: FomulsClassFinModel.ikkoFactMode as any,
			deviationmodelData: null,
			averageCostbyFact: null,
			averageFactbyCost: null
		},
		params: {
			factrub: 0,
			costs: 0,
			fact: 0,
			deviation: 0
		}
	},
	monthlyCheckCount: {
		name: inputFromNameFinModel.monthlyCheckCount,
		rashod: false,
		iikko: true,
		mark: FomulsClassFinModel.trendFormul("up"),
		colors: true,
		visible: true,
		formul: {
			factmodelData: FomulsClassFinModel.ikkoFactMode as any,
			deviationmodelData: null,
			averageCostbyFact: null,
			averageFactbyCost: null
		},
		lable: "руб",
		params: {
			factrub: 0,
			costs: 0,
			fact: 0,
			deviation: 0
		}
	},
	dailyCheckCount: {
		name: inputFromNameFinModel.dailyCheckCount,
		rashod: false,
		iikko: true,
		mark: FomulsClassFinModel.trendFormul("up"),
		colors: true,
		visible: true,
		lable: "руб",
		formul: {
			factmodelData: FomulsClassFinModel.ikkoFactMode as any,
			deviationmodelData: null,
			averageCostbyFact: null,
			averageFactbyCost: null
		},
		params: {
			factrub: 0,
			costs: 0,
			fact: 0,
			deviation: 0
		}
	},
	averageDailyRevenue: {
		name: inputFromNameFinModel.averageDailyRevenue,
		rashod: false,
		iikko: true,
		mark: FomulsClassFinModel.trendFormul("up"),
		colors: true,
		visible: true,
		lable: "руб",
		formul: {
			factmodelData: FomulsClassFinModel.ikkoFactMode as any,
			deviationmodelData: null,
			averageCostbyFact: null,
			averageFactbyCost: null
		},
		params: {
			factrub: 0,
			costs: 0,
			fact: 0,
			deviation: 0
		}
	}
}



