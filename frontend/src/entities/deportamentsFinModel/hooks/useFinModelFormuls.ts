import { IgroopsDep } from "features/deportamensListChoise/types/groopsdeportemets.type"
import { useCallback, useMemo } from "react"
import { FomulsClassFinModel } from "../entity/formulFinModel";
import { finModelEntity } from "../entity/finModelDomain";
import { IkeyFinModelEntity, IkeyFnFormulModelEntity } from "../types/finModel.type";



export const useFinModelFormuls = (deportament: IgroopsDep, mounhDate: string) => {

	useMemo(() => new FomulsClassFinModel(deportament.finmodel), [mounhDate])

	const checkFormul = (category: IkeyFinModelEntity, keyFn: IkeyFnFormulModelEntity, value: number) => {
		const formul = finModelEntity[category].formul
		return formul && (formul[keyFn] && formul[keyFn](category, value)) || 0
	}

	return {
		fact: (category: IkeyFinModelEntity, fact: number) => {
			return checkFormul(category, 'factmodelData', fact)
		},
		deviation: (category: IkeyFinModelEntity, dev: number) => {
			return checkFormul(category, 'deviationmodelData', dev) //finModelEntity[category as keyof typeof finModelEntity].formul?.deviationmodelData(category, dev)
		}

	}
}