import { useEffect, useState } from "react"
import { unloadIIKKOApiRequest } from "../api/unloadIIkko.api"
import { DeportamentApiRequest } from "@shared/api/deportament.api"
import { IgroopsDep } from "features/deportamensListChoise/types/groopsdeportemets.type"
import { FomulsClassFinModel, helperFinModel } from "entities/deportamentsFinModel/entity/formulFinModel"

export const useCaseUnloadIIkko = (
	params: {
		deportament: string
		keys: string,
		mounth: string,
	},
	formik: any,
	iikkoParams: any,
	formlMetods: any

) => {
	const [stausUnload, setStatusUnload] = useState<boolean>(false)

	const requestUnload = async () => {
		try {
			setStatusUnload(true)
			const getActiveDate = getUnloadParam(iikkoParams.activeDeportamentParamsIIKKO)

			if (getActiveDate) {
				const { data } = await unloadIIKKOApiRequest.setdataUnload({
					deportamentid: params.deportament,
					paramKeys: params.keys,
					mounth: params.mounth
				})
				if (data && data.status) {
					const getIIkkoParams = await iikkoParams.getUnloadParamIIkko()
					getUnloadParam(getIIkkoParams)
					setStatusUnload(false)
				}
			} else {
				setStatusUnload(false)
			}
		} catch (error) {
			setStatusUnload(false)
		}
	}



	const getUnloadParam = (paramsIIKKO: any) => {
		try {
			if (paramsIIKKO) {
				console.log(paramsIIKKO);

				const IIkkoParamByKey = paramsIIKKO.dataDetails[params.keys]
				//console.log(iikkoParams.activeDeportamentParamsIIKKO);

				if (IIkkoParamByKey) {
					const activeDate = helperFinModel.currentMounth(params.mounth, IIkkoParamByKey)

					if (activeDate) {
						formik.setFieldValue(`${params.keys}.factrub`, Math.round(activeDate.average));
						formik.setFieldValue(`${params.keys}.fact`, formlMetods.fact(params.keys, Math.round(activeDate.average)));

						return false
					}
				}
			}
			return true

		} catch (error) {
			console.log(error);
		}
	}


	useEffect(() => {

	}, [iikkoParams.activeDeportamentParamsIIKKO])

	return {
		handlerUnload: requestUnload,
		isLoading: stausUnload
	}
}