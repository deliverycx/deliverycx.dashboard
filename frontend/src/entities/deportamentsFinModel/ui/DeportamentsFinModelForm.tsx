import InputKeysDeportament from "@shared/ui/forms/InputKeysDeportament"
import { useCaseDeportamentsFinModelForm } from "../hooks/useCaseDeportamentsFinModelForm"
import { FC } from "react"
import InputKeysDeportamentFinModel from "@shared/ui/forms/InputKeysDeportamentFinModel"
import TextField from "@mui/material/TextField"
import { Box } from "@mui/material"
import { IpointList } from "@shared/@types/points.type"
import { IgroopsDep } from "features/deportamensListChoise/types/groopsdeportemets.type"
import { inputFromNameFinModel } from "../entity/finModelDomain"
import "./style.scss"
import { MediumButton } from "@shared/ui/buttons"

export const DeportamentsFinModelForm: FC<{ deportament: IgroopsDep }> = ({ deportament }) => {
	const { formik } = useCaseDeportamentsFinModelForm(deportament)


	const TextFieldKeys = () => {
		return (Object.keys(inputFromNameFinModel) as Array<keyof typeof inputFromNameFinModel>).map((key) => {

			return (
				<tr>
					<td scope="row" className="deportament_info-celltitle"><span>{inputFromNameFinModel[key]}</span></td>
					<td className="deportament_info-cell">
						<TextField
							variant="standard"
							id={key}
							name={`${key}.opening`}
							label=""
							value={formik.values[key].opening}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}

						/>
					</td>
					<td>
						<TextField
							variant="standard"
							id={key}
							name={`${key}.plan`}
							label=""
							value={formik.values[key].plan}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}

						/>
					</td>
				</tr>

			);
		});
	}



	return (
		<>
			<form onSubmit={formik.handleSubmit}>
				<div className="deportament_info">
					<table>
						<thead>
							<th scope="col"></th>
							<th scope="col">руб</th>
							<th scope="col">%(процент)</th>
						</thead>
						<tbody>
							{TextFieldKeys()}
						</tbody>
					</table>

				</div>
				<MediumButton status={formik.isSubmitting}>
					<input type="submit" value="Сохранить" className="inp_button" />
				</MediumButton>

			</form>
		</>
	)
}