
import TextField from '@mui/material/TextField';
import "./style.scss"
import { useCaseDeportamentInfoFormic } from '../hooks/useCaseDeportamentInfoFromic';
import { FC, useEffect } from 'react';
import InputKeysDeportament from '@shared/ui/forms/InputKeysDeportament';
import { MediumButton } from '@shared/ui/buttons';
import { IgroopsDep } from 'features/deportamensListChoise/types/groopsdeportemets.type';

export const DeportamentInfoForm: FC<{ deportament: IgroopsDep }> = ({ deportament }) => {
	const { formik, inputFromName } = useCaseDeportamentInfoFormic(deportament)



	return (
		<>
			<form onSubmit={formik.handleSubmit}>
				<div className="deportament_info">
					<h2>Информация франчайзи</h2>
					<InputKeysDeportament formik={formik} inputFromName={inputFromName} />
				</div>
				<MediumButton status={formik.isSubmitting}>
					<input type="submit" value="Сохранить" className="inp_button" />
				</MediumButton>
				<div className="deportament_info_line" ></div>
			</form>


		</>


	)
}
