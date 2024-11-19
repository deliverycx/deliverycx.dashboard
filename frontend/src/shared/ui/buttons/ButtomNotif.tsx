import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material"
import { FC, useEffect, useState } from "react"

type IProps = {
	status: boolean | string
}
export const ButtomNotif: FC<IProps> = ({ status }) => {
	const [open, setOpen] = useState(false);
	const [error, setError] = useState(false);

	const handleClose = (
		event: React.SyntheticEvent | Event,
		reason?: SnackbarCloseReason,
	) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	useEffect(() => {
		if (typeof status === 'boolean') {
			setOpen(true)
		}
		if (typeof status === 'string') {
			setOpen(true)
			setError(true)
		}
	}, [status])

	return (
		<>
			{
				error
					? <Snackbar
						open={open}
						autoHideDuration={5000}
						onClose={handleClose}
						anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
					>
						<Alert
							onClose={handleClose}
							severity="error"
							variant="filled"
							sx={{ width: '100%' }}
						>Произошла ошибка</Alert>

					</Snackbar >
					: <Snackbar
						open={open}
						autoHideDuration={5000}
						onClose={handleClose}
						anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
					>
						<Alert
							onClose={handleClose}
							severity="success"
							variant="filled"
							sx={{ width: '100%' }}
						>Успешно выполнено!</Alert>

					</Snackbar>
			}

		</>
	)
}