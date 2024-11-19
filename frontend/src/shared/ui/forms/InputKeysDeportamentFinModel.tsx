import { TextField } from "@mui/material";
import { FC, ReactNode } from "react";

type IProps = {
	inputFromName: Record<string, string>
	formik: any
	renderItem?: any
}

const InputKeysDeportamentFinModel: FC<IProps> = ({ inputFromName, formik, renderItem }) => {


	const TextFieldKeys = () => {
		return (Object.keys(inputFromName) as Array<keyof typeof inputFromName>).map((key) => {
			return (
				<div className="deportament_info-item">
					<span className="deportament_info-item_title">{inputFromName[key]}</span>
					<div className="deportament_info-item_value">
						{
							renderItem(key)
						}

					</div>
				</div>

			);
		});
	}
	return (
		<>{TextFieldKeys()}</>
	)
}

export default InputKeysDeportamentFinModel