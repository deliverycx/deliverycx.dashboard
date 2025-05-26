import { IgroopsDep } from "features/deportamensListChoise/types/groopsdeportemets.type"
import { FC, useState } from "react"
import { Box, TextField } from "@mui/material"
import { useCaseDeportamentsFinModelFormTable } from "../hooks/useCaseDeportamentsFinModelForm"
import { finModelEntity, inputFromNameFinModel } from "../entity/finModelDomain"
import { useFinModelFormuls } from "../hooks/useFinModelFormuls"
import { UnloadIIkkoDeportametn } from "entities/unloadIIkko"
import { useCaseRequestUnloadParams } from "../../unloadIIkko/hooks/useCaseRequestUnloadParams"
import { SettingDatePicker } from "features/dateFinModel/ui/SettingDatePicker"
import "./style.scss"
import { MediumButton } from "@shared/ui/buttons"

type IProps = {
	deportament: IgroopsDep
}

export const FinModelFormMouthTable: FC<IProps> = ({ deportament }) => {
	const [mounhDate, setMounthDate] = useState('')

	const fnFormulModel = useFinModelFormuls(deportament, mounhDate)
	const IIkkoParams = useCaseRequestUnloadParams(deportament)
	const { formik, handleFieldChange, statusForm } = useCaseDeportamentsFinModelFormTable(fnFormulModel, deportament.departamentid, mounhDate)


	const TextFieldKeys = () => {
		return (Object.keys(finModelEntity) as Array<keyof typeof finModelEntity>).map((key) => {
			const cat = key as keyof typeof finModelEntity;

			return finModelEntity[cat].visible !== false && (
				<tr>
					<td scope="row" className="deportament_info-celltitle">
						<span>{inputFromNameFinModel[key]}</span>
						{
							finModelEntity[key].iikko &&
							<div className="unload_box">
								<UnloadIIkkoDeportametn formik={formik} keysParam={{
									deportament: deportament.departamentid,
									keys: key,
									mounth: mounhDate,
								}} iikkoParams={IIkkoParams} fnFormulModel={fnFormulModel} />
							</div>
						}


					</td>
					<td className="deportament_info-cell table_model-cell">
						<TextField
							variant="standard"
							id={key}
							name={`${key}.factrub`}
							label="руб"
							value={formik.values[key].factrub}
							onChange={handleFieldChange}
						/>
					</td>
					<td className="deportament_info-cell table_model-cell">
						<TextField
							variant="standard"
							id={key}
							name={`${key}.costs`}
							label="%"
							value={formik.values[key].costs}
							onChange={handleFieldChange}
						/>
					</td>
					<td className="deportament_info-cell table_model-cell">
						<TextField
							variant="standard"
							id={key}
							name={`${key}.fact`}
							label={finModelEntity[key].lable}
							value={formik.values[key].fact}
						/>
					</td>
					<td className="deportament_info-cell table_model-cell">
						<TextField
							variant="standard"
							id={key}
							name={`${key}.deviation`}
							label="%"
							value={formik.values[key].deviation}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</td>
				</tr>

			);
		});
	}



	return (
		<div>
			<div className="picker_box">
				<div className="picker_box_info">
					<h3 className="picker_box_info-title">Текущий месяц</h3>
					<p className="picker_box_info-text"></p>
				</div>
				<SettingDatePicker setDate={setMounthDate} />
			</div>

			<div className="deportament_info">
				<form onSubmit={formik.handleSubmit}>
					<table>
						<thead>
							<th scope="col"></th>
							<th scope="col">Факт,руб</th>
							<th scope="col">Доля в затратах</th>
							<th scope="col">Факт</th>
							<th scope="col">Отклонение от среднего</th>
						</thead>
						<tbody>
							{TextFieldKeys()}
						</tbody>
					</table>
					<MediumButton status={statusForm}>
						<input type="submit" value="Сохранить" className="inp_button" />
					</MediumButton>
				</form>
			</div>
		</div>
	)
}