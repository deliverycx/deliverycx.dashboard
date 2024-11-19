import { TextField } from "@mui/material";
import { FC } from "react";

type IProps = {
	inputFromName: Record<string, string>
	formik: any
}

const InputKeysDeportament: FC<IProps> = ({ inputFromName, formik }) => {
	const TextFieldKeys = () => {
		return (Object.keys(inputFromName) as Array<keyof typeof inputFromName>).map((key) => {
			return (
				<div className="deportament_info-item">
					<span className="deportament_info-item_title">{inputFromName[key]}</span>
					<div className="deportament_info-item_value">
						<TextField
							fullWidth
							variant="standard"
							id={key}
							name={key}
							label={inputFromName[key]}
							value={formik.values[key]}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}

						/>
					</div>
				</div>

			);
		});
	}
	return (
		<>{TextFieldKeys()}</>
	)
}

export default InputKeysDeportament