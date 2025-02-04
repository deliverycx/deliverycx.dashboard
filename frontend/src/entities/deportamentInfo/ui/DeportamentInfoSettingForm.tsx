import { MediumButton } from "@shared/ui/buttons"
import { IgroopsDep } from "features/deportamensListChoise/types/groopsdeportemets.type"
import { FC } from "react"
import { useDeportamentInfoSettingForm } from "../hooks/useCaseDeportamentInfoFromic"
import { MenuItem, Switch, TextField } from "@mui/material"

export const DeportamentInfoSettingForm: FC<{ deportament: IgroopsDep }> = ({ deportament }) => {
	const { formik } = useDeportamentInfoSettingForm(deportament)

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		formik.setFieldValue("okupation", event.target.checked)
	}

	return (
		<>

			<form onSubmit={formik.handleSubmit}>
				<div className="deportament_info">
					<h2>Настройки</h2>
					<div className="deportament_info-item">
						<span className="deportament_info-item_title">Оценка качества</span>
						<div className="deportament_info-item_value">
							<TextField
								fullWidth
								variant="standard"
								id="quality"
								name="quality"
								label="В ведите значение"
								value={formik.values.quality}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}

							/>
						</div>
					</div>
					<div className="deportament_info-item">
						<span className="deportament_info-item_title">Оценка на яндекс</span>
						<div className="deportament_info-item_value">
							<TextField
								fullWidth
								variant="standard"
								id="yandex"
								name="yandex"
								label="В ведите значение"
								value={formik.values.yandex}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}

							/>
						</div>
					</div>
					<div className="deportament_info-item">
						<span className="deportament_info-item_title">Точка окупаемость</span>
						<div className="deportament_info-item_value">
							<Switch
								id="okupation"
								name="okupation"
								checked={formik.values.okupation}
								onChange={handleChange}
								inputProps={{ 'aria-label': 'controlled' }}
							/>
						</div>
					</div>
					<div className="deportament_info-item">
						<span className="deportament_info-item_title">Финансовая модель</span>
						<div className="deportament_info-item_value">
							<TextField
								id="typemodel"
								name="typemodel"
								select
								label="тип финансовой модели"
								value={formik.values.typemodel || ""}
								onChange={formik.handleChange}
								variant="filled"
							>
								<MenuItem key="regions" value="regions">
									Регионы
								</MenuItem>
								<MenuItem key="menu" value="menu">
									Повышеное меню
								</MenuItem>
								<MenuItem key="moscow" value="moscow">
									Москва
								</MenuItem>
							</TextField>
						</div>
					</div>
				</div>
				<MediumButton status={formik.isSubmitting}>
					<input type="submit" value="Сохранить" className="inp_button" />
				</MediumButton>
			</form>
		</>
	)
}