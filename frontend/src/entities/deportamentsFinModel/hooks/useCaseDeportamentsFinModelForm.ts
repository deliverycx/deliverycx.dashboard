import { DeportamentApiRequest } from "@shared/api/deportament.api";
import { IgroopsDep } from "features/deportamensListChoise/types/groopsdeportemets.type";
import { useFormik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { finModelEntity, inputFromNameFinModel } from "../entity/finModelDomain";
import { finModelApiRequest } from "../api/finModel.api";
import { IfinModelMouth } from "../types/finModel.type";
import { helperFinModel } from "../entity/formulFinModel";



export const useCaseDeportamentsFinModelForm = (deportament: IgroopsDep) => {
	const formik = useFormik({
		initialValues: {
			costPrice: { opening: '', plan: '' },
			payrollFund: { opening: '', plan: '' },
			rent: { opening: '', plan: '' },
			utilities: { opening: '', plan: '' },
			consumablesAndDisposableDishes: { opening: '', plan: '' },
			equipmentMaintenance: { opening: '', plan: '' },
			marketing: { opening: '', plan: '' },
			generalProductionExpenses: { opening: '', plan: '' },
			taxes: { opening: '', plan: '' },
			royalties: { opening: '', plan: '' },
			averageCheck: { opening: '', plan: '' },
			monthlyCheckCount: { opening: '', plan: '' },
			dailyCheckCount: { opening: '', plan: '' },
			averageDailyRevenue: { opening: '', plan: '' },
			averageRevenue: { opening: '', plan: '' },
			profit: { opening: '', plan: '' },
			expenses: { opening: '', plan: '' }
		},
		onSubmit: (values) => {
			requestSubmitDepInfo(values)
		},
	});




	useEffect(() => {
		(Object.keys(inputFromNameFinModel) as Array<keyof typeof inputFromNameFinModel>).map((key) => {
			if (deportament.finmodel) {
				deportament.finmodel[key] && formik.setFieldValue(`${key}.opening`, deportament.finmodel[key].opening)
				deportament.finmodel[key] && formik.setFieldValue(`${key}.plan`, deportament.finmodel[key].plan)
			} else {
				formik.resetForm()
			}
		})
	}, [deportament])


	const requestSubmitDepInfo = async (body: any) => {
		try {
			await DeportamentApiRequest.deportamentInfoData("finmodel", deportament.departamentid, body)
		} catch (error) {

		}
	}

	return { formik }
}


export const useCaseDeportamentsFinModelFormTable = (formlMetods: any, deportament: string, mounhDate: string) => {
	const [finModelAll, setFinModelAll] = useState<IfinModelMouth[] | null>(null)
	const [statusForm, setStatusForm] = useState<boolean>(false)


	const formik = useFormik({
		initialValues: {
			costPrice: finModelEntity.costPrice.params,
			payrollFund: finModelEntity.payrollFund.params,
			rent: finModelEntity.rent.params,
			utilities: finModelEntity.utilities.params,
			consumablesAndDisposableDishes: finModelEntity.consumablesAndDisposableDishes.params,
			equipmentMaintenance: finModelEntity.equipmentMaintenance.params,
			marketing: finModelEntity.marketing.params,
			generalProductionExpenses: finModelEntity.generalProductionExpenses.params,
			taxes: finModelEntity.taxes.params,
			royalties: finModelEntity.royalties.params,
			averageCheck: finModelEntity.averageCheck.params,
			monthlyCheckCount: finModelEntity.monthlyCheckCount.params,
			dailyCheckCount: finModelEntity.dailyCheckCount.params,
			averageDailyRevenue: finModelEntity.averageDailyRevenue.params,
			averageRevenue: finModelEntity.averageRevenue.params,
		},
		onSubmit: async (values) => {
			try {
				const metricValue = helperFinModel.metricModel(values)
				await finModelApiRequest.setfinmodel({
					model: values,
					metric: metricValue
				}, deportament, mounhDate)


				await getFinModel()
				setStatusForm(true)
			} catch (error) {
				setStatusForm(false)
			}

		},
	});



	const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		formik.setFieldValue(name, value);

		const fieldSegments = name.split('.');
		if (fieldSegments.length === 2 && (fieldSegments[1] === 'factrub' || fieldSegments[1] === 'costs')) {
			const [category, field] = fieldSegments;
			const categoryValues = formik.values[category as keyof typeof finModelEntity];

			// Получаем актуальные значения factrub и costs
			const factrub = field === 'factrub' ? parseFloat(value) : categoryValues.factrub;
			const costs = field === 'costs' ? parseFloat(value) : categoryValues.costs;

			// Обновляем связанные поля fact и deviation для соответствующей категории
			const fact = factrub; // Ваша логика для fact
			const deviation = costs; // Ваша логика для deviation


			formik.setFieldValue(`${category}.fact`, formlMetods.fact(category, fact));
			formik.setFieldValue(`${category}.deviation`, formlMetods.deviation(category, deviation));

		}
	}

	const getFinModel = async () => {
		try {
			const { data } = await finModelApiRequest.getFinModel(deportament)
			if (data && data.paramsModel && data.paramsModel.lenght !== 0) {
				setFinModelAll(data.paramsModel)
			}
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getFinModel()
	}, [deportament])


	useEffect(() => {
		if (finModelAll) {
			const finModelMounth = finModelAll.find((val) => val.mouth === mounhDate)
			if (finModelMounth) {
				const model = finModelMounth.model
				for (const key in model) {
					const category = key as keyof typeof finModelEntity
					formik.setFieldValue(`${category}.fact`, model[category].fact);
					formik.setFieldValue(`${category}.costs`, model[category].costs);
					formik.setFieldValue(`${category}.factrub`, model[category].factrub);
					formik.setFieldValue(`${category}.deviation`, model[category].deviation);
				}
			}
		}

		const tik = setTimeout(() => setStatusForm(false), 5000)
		return () => {
			clearTimeout(tik)
		}
	}, [finModelAll, mounhDate])

	return { formik, handleFieldChange, statusForm }
}