import { FC } from "react"
import { useCaseDeportamentsTable } from "../hooks/useCaseDeportamentsTable"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TableSortLabel } from "@mui/material";
import { keyDifferenceRatingParams } from "entities/generalMapRating/types/colorRating.type";

export const DeportamentsTableColorGradient: FC<{ deportametColorList: any }> = ({ deportametColorList }) => {
	const { sortedDeportametColorList, orderBy, handlerSorted, keyDiffRating } = useCaseDeportamentsTable(deportametColorList)



	return (
		<Table sx={{ minWidth: 500 }} aria-label="simple table">
			<TableHead>
				<TableRow>
					<TableCell>Название</TableCell>
					<TableCell align="right">
						<TableSortLabel
							active={orderBy.sortid === keyDifferenceRatingParams[keyDiffRating]}
							direction={orderBy.sorted}
							onClick={
								(event) => orderBy.sorted === "desc"
									? handlerSorted("asc", keyDifferenceRatingParams[keyDiffRating])
									: handlerSorted("desc", keyDifferenceRatingParams[keyDiffRating])}
						>
							{
								keyDiffRating == keyDifferenceRatingParams.profitDifferenceOpening && "По сумме"
							}
							{
								keyDiffRating == keyDifferenceRatingParams.profitDifferencePlan && "По %"
							}
						</TableSortLabel>
					</TableCell>


				</TableRow>
			</TableHead>
			<TableBody>
				{sortedDeportametColorList && sortedDeportametColorList.map((row: any) => (
					<TableRow
						key={row.deportamentName}
						sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
					>
						<TableCell component="th" scope="row">
							{row.deportamentName}
						</TableCell>
						<TableCell align="right">{(Math.floor(row[keyDiffRating] * 100) / 100)}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}