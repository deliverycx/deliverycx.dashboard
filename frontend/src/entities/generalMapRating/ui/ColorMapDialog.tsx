import Dialog from '@mui/material/Dialog';
import { DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { FC, useContext, useMemo } from 'react';
import "./ColorMapRating.style.scss"
import { ColorGradientContext } from './ColorGradientMapRating';
import { keyDifferenceRatingParams } from '../types/colorRating.type';
import { DeportametListContext } from 'widgets/heatmapRating/ui/HeatmapRating';
import { useCaseColorMapDialog } from '../hooks/useCaseColorMapDialog';
import { DeportamentsTableColorGradient } from 'features/deportamentsTable/ui';


type IProps = {
	state: any
	maps: any
}
export const ColorMapDialog: FC<IProps> = ({ state, maps }) => {
	const { titleDialog, deportametColorList } = useCaseColorMapDialog(maps)

	const [open, setOpen] = state
	const handleClose = () => {
		setOpen(false)
	}

	return (
		<Dialog
			onClose={handleClose}
			aria-describedby="alert-dialog-slide-description"
			open={(open && deportametColorList)}

		>
			<DialogTitle sx={{ m: 0, p: 2 }} id="colorMap-dialog-title">
				{titleDialog()}
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
			<DialogContent dividers>
				<div className="colorMap_dialog">
					<div className="colorMap_dialog_box">
						<DeportamentsTableColorGradient deportametColorList={maps.map} />
					</div>
				</div>
			</DialogContent>

		</Dialog>
	)
}