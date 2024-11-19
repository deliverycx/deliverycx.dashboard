import { FC, useEffect, useState } from "react"
import { useCaseUnloadIIkko } from "../hooks/useCaseunloadIIkko.hooks"
import { Alert, Button, Snackbar } from "@mui/material"
import "./style.scss"
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';


type IProps = {
	keysParam: {
		deportament: string
		keys: string,
		mounth: string,
	}
	formik: any,
	iikkoParams: any,
	fnFormulModel: any
}
export const UnloadIIkkoDeportametn: FC<IProps> = ({ keysParam, formik, iikkoParams, fnFormulModel }) => {
	const { handlerUnload, isLoading } = useCaseUnloadIIkko(keysParam, formik, iikkoParams, fnFormulModel)
	const [open, setOpen] = useState(false);


	useEffect(() => {
		isLoading ? setOpen(true) : setOpen(false)
	}, [isLoading])

	return (
		<>
			{
				isLoading
					? <LoadingButton
						loading
						loadingPosition="start"
						startIcon={<SaveIcon />}
						variant="outlined"
					>Загрузка</LoadingButton>
					: <Button size="small" onClick={handlerUnload} startIcon={<CloudDownloadIcon color="primary" />}>Выгрузка из айко </Button>
			}
			<Snackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} autoHideDuration={10000} onClose={() => setOpen(false)}>
				<Alert
					onClose={() => setOpen(false)}
					severity="warning"
					variant="filled"
					sx={{ width: '100%' }}
				>
					<h3>Внимание!</h3>
					<h5>Ожидание первой выгрузки из айко, может состовлять:</h5>
					<p> <strong>от 2</strong>,  <strong>до 10</strong> минут</p>
					<p>данные поля вы можете заполнить, в ручную</p>
				</Alert>
			</Snackbar>
		</>
	)
}