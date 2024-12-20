import React, { FC, ReactNode } from "react"
import { useChartDeportamentGeneral } from "../hooks/useChartDeportamentGeneral"
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { LineChart } from "@mui/x-charts";
import "./style.scss"
import { ChartsModel } from "entities/charts";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiDialogContent-root': {
		padding: theme.spacing(2),
	},
	'& .MuiDialogActions-root': {
		padding: theme.spacing(1),
	},
}));

type IProps = {
	deportament: string
	typemodel: "profitDifferenceOpening" | "profitDifferencePlan"
	children: ReactNode
}
export const DeportamentModalChartGeneral: FC<IProps> = ({ deportament, typemodel, children }) => {
	const [open, setOpen] = React.useState(false);
	const { generalDeportament, getDeportamentGeneralAllMounth } = useChartDeportamentGeneral()

	const handleClickOpen = () => {
		setOpen(true);
		getDeportamentGeneralAllMounth(deportament, typemodel)
	};
	const handleClose = () => {
		setOpen(false);
	}
	return (
		<>
			<div className="linkmodal_chart" onClick={handleClickOpen}>{children}</div>
			<BootstrapDialog
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				open={open}
				maxWidth={"md"}
			>

				<DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
					Прибыль заведения за год
				</DialogTitle>
				<IconButton
					aria-label="close"
					onClick={handleClose}
					sx={(theme) => ({
						position: 'absolute',
						right: 8,
						top: 8,
						color: theme.palette.grey[500],
					})}
				>
					<CloseIcon />
				</IconButton>

				<DialogContent >
					{
						generalDeportament &&
						<ChartsModel chart={generalDeportament} settings={{ color: "", lable: typemodel === "profitDifferenceOpening" ? "Сумма" : "Процент" }} />
					}
				</DialogContent>

			</BootstrapDialog>
		</>
	)
}